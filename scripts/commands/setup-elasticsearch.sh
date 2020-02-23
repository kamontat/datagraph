#!/bin/bash

go_to_project_root

# shellcheck disable=SC1090
source "$PWD/.env" || exit 2

host="${1:-localhost}"
port="3201"

__elastic_apis() {
  local auth_user="${ESUN_ELASTIC}"
  local auth_pass="${ESPW_ELASTIC}"

  local method="$1"
  local data="$2"
  local path="$3"

  printf "%-5s to %-38s: " "$method" "$path"

  curl -s \
    -X "$method" \
    -H "Content-Type: application/json; charset=utf-8" \
    -u "${auth_user}:${auth_pass}" \
    -d $"$data" \
    "http://${host}:${port}${path}"

  echo
}

__elastic_change_password() {
  local username="$1"
  local newpass="$2"

  __elastic_apis "POST" "{\"password\" : \"${newpass}\"}" "/_security/user/$username/_password"
}

__elastic_create_role() {
  local rolename="$1"
  local body="$2"

  __elastic_apis "POST" "$body" "/_security/role/$rolename"
}

__elastic_create_user() {
  local username="$1"
  local body="$2"

  __elastic_apis "POST" "$body" "/_security/user/$username"
}

__elastic_change_password "${ESUN_KIBANA}" "${ESPW_KIBANA}"

__elastic_change_password "${ESUN_MONITOR}" "${ESPW_MONITOR}"

__elastic_create_role "metricbeat_writer" '{
  "cluster":[ 
    "monitor",
    "manage_index_templates",
    "manage_ilm"
  ],
  "indices": [
    {
      "names": [ "metricbeat-*" ],
      "privileges":[ "all" ]
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata" : {}
}'
__elastic_create_role "metricbeat_reader" '{
  "cluster":[ 
    "monitor",
    "manage_index_templates",
    "manage_ilm"
  ],
  "indices": [
    {
      "names": [ "metricbeat-*" ],
      "privileges":[
        "read",
        "view_index_metadata"
      ]
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata" : {}
}'
__elastic_create_role "filebeat_writer" '{
  "cluster":[ 
    "monitor",
    "manage_index_templates",
    "manage_ilm"
  ],
  "indices": [
    {
      "names": [ "filebeat-*" ],
      "privileges":[ "all" ]
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata" : {}
}'
__elastic_create_role "filebeat_reader" '{
  "cluster":[ 
    "monitor",
    "manage_index_templates",
    "manage_ilm"
  ],
  "indices": [
    {
      "names": [ "filebeat-*" ],
      "privileges":[
        "read",
        "view_index_metadata"
      ]
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata" : {}
}'
__elastic_create_role "heartbeat_writer" '{
  "cluster":[ 
    "monitor",
    "manage_index_templates",
    "manage_ilm"
  ],
  "indices": [
    {
      "names": [ "heartbeat-*" ],
      "privileges":[ "all" ]
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata" : {}
}'
__elastic_create_role "heartbeat_reader" '{
  "cluster":[ 
    "monitor",
    "manage_index_templates",
    "manage_ilm"
  ],
  "indices": [
    {
      "names": [ "heartbeat-*" ],
      "privileges":[
        "read",
        "view_index_metadata"
      ]
    }
  ],
  "applications": [],
  "run_as": [],
  "metadata" : {}
}'

__elastic_create_user "${ESUN_FILEBEAT}" "{
  \"password\" : \"${ESPW_FILEBEAT}\",
  \"full_name\" : \"Filebeat internal\",
  \"email\" : \"filebeat@internal.kcnt.info\",
  \"roles\" : [\"filebeat_writer\",\"beats_admin\",\"beats_system\",\"kibana_admin\",\"kibana_system\"]
}"
__elastic_create_user "${ESUN_METRICBEAT}" "{
  \"password\" : \"${ESPW_METRICBEAT}\",
  \"full_name\" : \"Metricbeat internal\",
  \"email\" : \"metricbeat@internal.kcnt.info\",
  \"roles\" : [\"metricbeat_writer\",\"beats_admin\",\"beats_system\",\"kibana_admin\",\"kibana_system\"]
}"
__elastic_create_user "${ESUN_HEARTBEAT}" "{
  \"password\" : \"${ESPW_HEARTBEAT}\",
  \"full_name\" : \"Heartbeat internal\",
  \"email\" : \"heartbeat@internal.kcnt.info\",
  \"roles\" : [\"heartbeat_writer\",\"beats_admin\",\"beats_system\",\"kibana_admin\",\"kibana_system\"]
}"
__elastic_create_user "${ESUN_GRAFANA}" "{
  \"password\" : \"${ESPW_GRAFANA}\",
  \"full_name\" : \"grafana\",
  \"email\" : \"grafana@kcnt.info\",
  \"roles\":[\"superuser\"]
}"
__elastic_create_user "${ESUN_ADMIN}" "{
  \"password\" : \"${ESPW_ADMIN}\",
  \"full_name\" : \"admin\",
  \"email\" : \"admin@kcnt.info\",
  \"roles\":[\"superuser\"]
}"
__elastic_create_user "${ESUN_GUEST}" "{
  \"password\" : \"${ESPW_GUEST}\",
  \"full_name\" : \"guest\",
  \"email\" : \"guest@kcnt.info\",
  \"roles\":[\"kibana_dashboard_only_user\"]
}"

unset host port

unset __elastic_apis
unset __elastic_change_password
unset __elastic_create_role
unset __elastic_create_user

go_back
