#!/usr/bin/env bash

export __DOCKER_COMPOSE_TEMPLATE_FILE="docker-compose-template.yml"
export __DOCKER_COMPOSE_FILE="docker-compose.yml"
export __DOCKER_COMPOSE_SHA1SUM="docker-compose-template.sha1sum"

export __DOCKER_CHECKSUM_CMD="/usr/bin/shasum"

precheck_docker() {
  newsum="$("${__DOCKER_CHECKSUM_CMD}" "${__DOCKER_COMPOSE_TEMPLATE_FILE}")"
  oldsum="$(cat "${__DOCKER_COMPOSE_SHA1SUM}")"

  debug "docker" "new checksum is ${newsum}"
  debug "docker" "old checksum is ${oldsum}"

  if [[ "${newsum}" != "${oldsum}" ]]; then
    "${__ROOT_DIR}/index.sh" "build" "compose"
  fi
}

list_docker_service_name() {
  echo "services name: [$(docker-compose ps --services | tr "\n" " ")]"
}

ask_docker_service_name() {
  read -r ans
  echo "$ans"
}

export -f precheck_docker
export -f list_docker_service_name
export -f ask_docker_service_name
