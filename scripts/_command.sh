#!/usr/bin/env bash

FIRST=""
SECOND=""
ARGUMENTS=()

load_command() {
  for arg in "$@"; do
    if is_command "${arg}"; then
      if test -z "$FIRST"; then
        debug "command" "setting first command to ${arg}"
        FIRST="${arg}"
      elif test -n "$FIRST" && test -z "$SECOND"; then
        debug "command" "setting second command to ${arg}"
        SECOND="${arg}"
      else
        debug "command" "setting to subcommand argument to ${arg}"
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
