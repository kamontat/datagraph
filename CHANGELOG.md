<a name="unreleased"></a>
## [Unreleased]

### Feature
- config all modules
- **docker:** support docker and restart

### Fixes Bug
- remove .env in git cache
- **docker:** wrong type in hearthcheck config
- **docker:** all permission relate
- **docker:** remove docker-compose since you need to build by yourself
- **docker:** curl not found in some container
- **heartbeat:** it didn't have pre dashboard installed
- **kibana:** healthcheck is might fails
- **metricbeat:** remove data directory
- **onuser:** heartcheck is not valid

### Improving application
- include .env in gitignore
- remove .env files but create the file template instead
- support custom kibana ip-address
- **docs:** update README to support latest version
- **elasticsearch:** add more pre user for heartbeat
- **heartbeat:** add dashboard sample enabled
- **heartbeat:** update heartbeat config
- **kibana:** wget is not exist in kibana container


<a name="v1.0.1"></a>
## [v1.0.1] - 2020-02-18
### Feature
- **deps:** remove logstash and send log directly


<a name="v1.0.0"></a>
## v1.0.0 - 2020-02-18
### Feature
- **auth:** support easier config in docker-compose
- **elasticsearch:** add auth to elasticsearch
- **init:** start initial git commit

### Fixes Bug
- **auth:** invalid key string in filebeat and metricbeat
- **docker:** wrong configuration of metricbeat.yml

### Improving application
- **auth:** update auth of elastic stack
- **docker:** update environment name in docker
- **logstash:** make indexter to be superuser
- **onuser:** add support multiple apis environments


[Unreleased]: https://source.developers.google.com/p/the-tokenizer-268111/r/graph/compare/v1.0.1...HEAD
[v1.0.1]: https://source.developers.google.com/p/the-tokenizer-268111/r/graph/compare/v1.0.0...v1.0.1
