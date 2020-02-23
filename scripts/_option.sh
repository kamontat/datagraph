#!/usr/bin/env bash

load_option() {
  while getopts 'Hh?Vv-:' flag; do
    case "${flag}" in
    H) help && exit 0 ;;
    h) help && exit 0 ;;
    \\?) help && exit 0 ;;
    V) version && exit 0 ;;
    v) version && exit 0 ;;
    -)
      export LONG_OPTARG
      export LONG_OPTVAL
      NEXT="${!OPTIND}"
      set_key_value_long_option "$NEXT"
      case "${OPTARG}" in
      help)
        no_argument
        help
        exit 0
        ;;
      version)
        no_argument
        version
        exit 0
        ;;
      *)
        # because optspec is assigned by 'getopts' command
        # shellcheck disable=SC2154
        if [ "$OPTERR" == 1 ] && [ "${optspec:0:1}" != ":" ]; then
          echo "Unexpected option '$LONG_OPTARG', run --help for more information" >&2
          exit 9
        fi
        ;;
      esac
      ;;
    ?)
      echo "Unexpected option, run --help for more information" >&2
      exit 10
      ;;
    *)
      echo "Unexpected option $flag, run --help for more information" >&2
      exit 10
      ;;
    esac
  done
}

export -f load_option
