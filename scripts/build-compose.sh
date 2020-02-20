#!/bin/bash

cd "$(dirname "$0")/.." || exit 1

template="docker-compose-template.yml"
compose="docker-compose.yml"

echo "########################################
# Built by $template #
########################################
" >"$compose"

docker-compose --file "$template" config >>"$compose"
