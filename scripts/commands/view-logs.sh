#!/bin/bash

__container="${1}"

go_to_project_root
precheck_docker

list_docker_service_name

printf "Enter valid docker-compose service name: "
if test -z "${__container}"; then
  container="$(ask_docker_service_name)"
else
  container="$__container"
fi

docker-compose logs -f "${container}"

unset __command

go_back
