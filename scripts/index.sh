#!/usr/bin/env bash

__CURRENT_DIR="$PWD"

export __ROOT_DIR
__ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
test -z "$__ROOT_DIR" && exit 1 # check root directory
cd "${__CURRENT_DIR}" || exit 1 # go back to current directory

unset __CURRENT_DIR

__RES_DIR="${__ROOT_DIR}/res"
# shellcheck disable=SC1090
source "${__RES_DIR}/helper-option.sh" || exit 2

# shellcheck disable=SC1090
source "${__RES_DIR}/helper-help.sh" || exit 2
# shellcheck disable=SC1090
source "${__RES_DIR}/helper-version.sh" || exit 2
# shellcheck disable=SC1090
source "${__RES_DIR}/helper-docker.sh" || exit 2

# shellcheck disable=SC1090
source "${__ROOT_DIR}/_command.sh" || exit 2
# shellcheck disable=SC1090
source "${__ROOT_DIR}/_option.sh" || exit 2

load_option "$@"
load_command "$@"

filename="${FIRST}-${SECOND}"
filename="${filename}$(test -n "$THIRD" && printf "-%s" "${THIRD}")"
filename="${filename}.sh"

debug "file" "loading $filename in commands directory"

# shellcheck disable=SC1090
bash "${__ROOT_DIR}/commands/${filename}" "${ARGUMENTS[@]}" || exit 3
