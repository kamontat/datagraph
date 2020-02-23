#!/usr/bin/env bash

is_integer() {
  [[ $1 =~ ^[0-9]+$ ]] 2>/dev/null && return 0 || return 1
}

# @helper
throw() {
  printf '%s\n' "$1" >&2 && is_integer "$2" && exit "$2"
  return 0
}

# @helper
throw_if_empty() {
  local text="$1"
  test -z "$text" && throw "$2" "$3"
  return 0
}

# @option
require_argument() {
  throw_if_empty "$LONG_OPTVAL" "'$LONG_OPTARG' require argument" 9
}

# @option
no_argument() {
  [[ -n $LONG_OPTVAL ]] && ! [[ $LONG_OPTVAL =~ "-" ]] && throw "$LONG_OPTARG don't have argument" 9
  OPTIND=$((OPTIND - 1))
}

# @syscall
set_key_value_long_option() {
  if [[ $OPTARG =~ "=" ]]; then
    LONG_OPTVAL="${OPTARG#*=}"
    LONG_OPTARG="${OPTARG%%=$LONG_OPTVAL}"
  else
    LONG_OPTARG="$OPTARG"
    LONG_OPTVAL="$1"
    OPTIND=$((OPTIND + 1))
  fi
}

is_command() {
  if [[ "$1" =~ "-" ]] || [[ "$1" == "" ]]; then
    return 1
  else
    return 0
  fi
}

echof() {
  local level="$1"
  local title="$2"
  shift 2
  local msgs="$*"
  echo "[${level}] ${title}: ${msgs}"
}
debug() {
  # shellcheck disable=SC2068
  echof "debug" $@
}
info() {
  # shellcheck disable=SC2068
  echof "info" $@
}
warn() {
  # shellcheck disable=SC2068
  echof "warn" $@
}
error() {
  # shellcheck disable=SC2068
  echof "error" $@
}

go_to_project_root() {
  export __FORBACK_PATH="$PWD"

  cd "${__ROOT_DIR}/.." || exit 1
  debug "helper" "current directory is ${PWD}"
}

go_back() {
  test -n "${__FORBACK_PATH}" && cd "${__FORBACK_PATH}" || exit 5
}

export -f throw
export -f throw_if_empty
export -f require_argument
export -f no_argument
export -f set_key_value_long_option
export -f is_integer
export -f is_command

export -f echof
export -f debug
export -f info
export -f warn
export -f error

export -f go_to_project_root
export -f go_back
