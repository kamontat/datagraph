#!/bin/bash

go_to_project_root
precheck_docker

docker-compose up -d "$@"

go_back
