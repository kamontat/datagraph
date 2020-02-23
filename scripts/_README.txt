[index]

description: This is script for do things on this project. I custom all script for running on this projects only.
example: [bash] ./scripts/index.sh [<option>] args...

option:
  1. --help:    open this help message
  2. --version: open version message

args:
  1. try command                    : for testing is command runnable
  2. setup elasticsearch            : create all necessary data for new cluster
  3. pull docker                    : pull latest docker image to local
  4. build compose <host:localhost> : build new docker-compose.yml file
  5. start up                       : starting start docker-compose container
  5. restart up <service_name...>   : force restarting started docker-compose container, add service_name to run in specify services
  6. list docker                    : list all running docker containers
  7. view logs                      : enter name to view logs
  8. view docker                    : enter name to bash to container

thanks: Kamontat Chantrachirathumrong <developer@kamontat.net>