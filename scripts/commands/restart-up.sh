#!/bin/bash

go_to_project_root
precheck_docker

docker-compose up --detach --force-recreate --no-deps --renew-anon-volumes "$@"

go_back
