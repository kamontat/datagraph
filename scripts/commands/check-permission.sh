#!/bin/bash

go_to_project_root

get_permission() {
  local filename="$1"
  local arr
  # shellcheck disable=SC2207
  arr=($(ls -na "$filename"))
  result="${arr[0]}"
  [[ "$result" =~ "-rw--w--wx" ]] && echo 623 && return 0
  [[ "$result" =~ "-rw-r--r--" ]] && echo 644 && return 0
  [[ "$result" =~ "drwxr-xr-x" ]] && echo 755 && return 0
  [[ "$result" =~ "-rwxrwxrwx" ]] && echo 777 && return 0
  echo "$result"
}

get_owner() {
  local filename="$1"
  local arr
  # shellcheck disable=SC2207
  arr=($(ls -na "$filename"))
  result="${arr[2]}"
  echo "$result"
}

get_group() {
  local filename="$1"
  local arr
  # shellcheck disable=SC2207
  arr=($(ls -na "$filename"))
  result="${arr[3]}"
  echo "$result"
}

checking() {
  local method="get_$1"
  local filename="$2"
  local expect="$3"

  local actual
  actual="$(eval "$method" "$filename")"

  info "$1" "checking ${filename}: '${expect}' ? = ? '${actual}'"
  [[ "$expect" == "$actual" ]] && info "checking PASSED !" && return 0

  if [[ "$1" == "permission" ]]; then
    debug "permission" "run 'chmod -R \"$expect\" \"$filename\"'"
  elif [[ "$1" == "owner" ]]; then
    debug "owner" "run 'sudo chown -R \"$expect\" \"$filename\"'"
  elif [[ "$1" == "group" ]]; then
    debug "group" "run 'sudo chown -R \":$expect\" \"$filename\"'"
  fi
}

# 644 -rw-r--r--
# 755 drwxr-xr-x

checking "permission" "metricbeat/metricbeat.yml" "623"
checking "owner" "metricbeat/metricbeat.yml" "0"
checking "group" "metricbeat/metricbeat.yml" "0"

checking "permission" "filebeat/filebeat.yml" "623"
checking "owner" "filebeat/filebeat.yml" "0"
checking "group" "filebeat/filebeat.yml" "0"

checking "owner" "grafana/data" "$USER"
checking "group" "grafana/data" "${GROUP:-$USER}"

checking "owner" "prometheus/data" "$USER"
checking "group" "prometheus/data" "${GROUP:-$USER}"

go_back
