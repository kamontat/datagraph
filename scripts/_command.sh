#!/usr/bin/env bash

FIRST=""
SECOND=""
ARGUMENTS=()

load_command() {
  for arg in "$@"; do
    if is_command "${arg}"; then
      if test -z "$FIRST"; then
        debug "command" "set FIRST=${arg}"
        FIRST="${arg}"
      elif test -n "$FIRST" && test -z "$SECOND"; then
        debug "command" "set SECOND=${arg}"
        SECOND="${arg}"
      else
        debug "command" "set ARGUMENTS=[${arg}]"
        ARGUMENTS+=("${arg}")
      fi
    else
      debug "command" "This is not a arguments ($arg)."
    fi
  done
}

export FIRST
export SECOND
export ARGUMENTS
