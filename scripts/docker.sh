#!/bin/bash

cd "$(dirname "$0")/.." || exit 1

stack_name="graph"
orchestrator="swarm"

_DOCKER_ACTION="$1"
_DOCKER_ACTIONS=()
shift 1

__docker_action_is() {
  _DOCKER_ACTIONS+=("$@")
  for act in "$@"; do
    [[ "$_DOCKER_ACTION" == "$act" ]] && return 0
  done
  return 1
}

__docker_echo() {
  local level="$1"
  local action="$2"
  shift 2
  local msg="$*"

  echo "[$level] $action... $msg"
}

__docker_info() {
  # shellcheck disable=SC2068
  __docker_echo "info" $@
}

__docker_warn() {
  # shellcheck disable=SC2068
  __docker_echo "warn" $@
}

__docker_error() {
  # shellcheck disable=SC2068
  __docker_echo "error" $@
}

__docker_build_image_name() {
  local appname="$1"
  echo "${stack_name}_${appname}"
}

__docker_build_config_name() {
  local appname="$1"
  echo "${stack_name}_${appname}-config"
}

__docker_build_config_filepath() {
  local appname="$1"
  echo "$PWD/${appname}/${appname}.yml"
}

__docker_search_containerid() {
  local name="$1"
  docker ps --filter name="$name" -q
}

if __docker_action_is "sdeploy"; then
  __docker_info "deploying" "stack"
  docker stack deploy --compose-file docker-compose.yml --orchestrator "$orchestrator" "$stack_name"
elif __docker_action_is "sps"; then
  __docker_info "listing" "stack-task"
  docker stack ps --orchestrator "$orchestrator" "$stack_name"
elif __docker_action_is "srm"; then
  __docker_info "removing" "stack"
  docker stack rm --orchestrator swarm "$stack_name"
elif __docker_action_is "svupdate"; then
  __docker_info "updating" "services"
  docker service update "$@"
elif __docker_action_is "svls"; then
  __docker_info "listing" "services"
  # docker service ls "$@" # old style
  docker stack services "$stack_name" --orchestrator swarm
elif __docker_action_is "svlogs"; then
  __docker_info "logging" "services"
  docker service logs "$@"
elif __docker_action_is "l" "ls"; then
  __docker_info "listing" "containers"
  docker ps --filter="name=graph" "$@"
elif __docker_action_is "la"; then
  __docker_info "listing" "all-containers"
  docker ps --filter="name=graph" -a "$@"
elif __docker_action_is "logs"; then
  __docker_info "logging" "containers"
  docker logs "$@"
elif __docker_action_is "exec" "bash"; then
  __docker_info "shelling" "containers"
  id="$(__docker_search_containerid "$1")"
  docker exec -it "$id" bash
elif __docker_action_is "rm"; then
  __docker_info "restarting" "containers"
  id="$(__docker_search_containerid "$1")"
  docker rm --force "$id"
elif __docker_action_is "reconfig"; then
  image="$(__docker_build_image_name "$1")"
  config="$(__docker_build_config_name "$1")"
  filepath="$(__docker_build_config_filepath "$1")"

  __docker_info "removing" "configs=$config on image=$image"
  docker service update "$image" --config-rm "$config"

  __docker_info "removing" "configs=$config resource"
  docker config rm "$config"

  __docker_info "creating" "config=$config at $filepath"
  docker config create "$config" "$filepath"

  __docker_info "attaching" "config=$config to image=$image"
  docker service update "$image" --config-add "$config"
else
  echo "not exist: action=$_DOCKER_ACTION" >&2
  echo "accept:    actions=${_DOCKER_ACTIONS[*]}"
  exit 1
fi

unset _DOCKER_ACTION
unset _DOCKER_ACTIONS

unset __docker_action_is
unset __docker_echo
unset __docker_info
unset __docker_warn
unset __docker_error

unset __docker_build_image_name
unset __docker_build_config_name
unset __docker_build_config_filepath

unset __docker_search_containerid
