#!/bin/bash

go_to_project_root

"${__DOCKER_CHECKSUM_CMD}" "${__DOCKER_COMPOSE_TEMPLATE_FILE}" >"${PWD}/${__DOCKER_COMPOSE_SHA1SUM}"

echo "########################################
# Built by ${__DOCKER_COMPOSE_TEMPLATE_FILE} #
########################################
" >"${__DOCKER_COMPOSE_FILE}"

docker-compose --file "$__DOCKER_COMPOSE_TEMPLATE_FILE" config >>"$__DOCKER_COMPOSE_FILE"

go_back
