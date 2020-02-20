# Graph

- [Setup](#setup)
  - [Google cloud platform](#google-cloud-platform)
  - [Grafana](#grafana)
  - [Elasticsearch](#elasticsearch)
- [DevOps Stack](#devops-stack)
- [Miscellaneous](#miscellaneous)
  - [Links](#links)
    - [External](#external)
    - [Internal](#internal)
  - [FAQ](#faq)
- [Credit](#credit)

## Setup

This section is for setting whole stack up

### Google cloud platform

1. Create `google-cloud-platform` account
2. Add **credit-card** to enable all resources (but no-need to account billing account)
3. Create 1 VM instance in `google-compute-engine` (aka `GCE`)
   1. Machine type: n1-standard-1 (1 vCPU, 3.75 GB memory)
   2. Boot disk: Standard Persistent Disk 30GB
   3. OS: Container Optimized OS, latest stable version
   4. (maybe) add static ip address to container

### Grafana

1. Add datasource as **Prometheus**
   1. URL: http://prometheus:9090
   2. **Save & Test**
2. Add datasource as **Stackdriver**
   1. Download JWT token file from GCP
3. Add datasource as **Elasticsearch (metricbeat)**
   1. URL: http://elasticsearch:9200
   2. Index name: `metricbeat-*`
   3. Time field name: @timestamp
   4. Version: 7.0+
   5. Max concurrent Shard Requests: 3
   6. Min time interval: 1m
4. Import Dashboard from grafana folder

### Elasticsearch

1. login to `elasticsearch` running container (`docker exec -it elasticsearch bash`)
2. Generate password for all exist user: using `bin/elasticsearch-setup-passwords auto` command
3. Set all password environment in `docker-compose.yml`
   1. set `$ESPW_FILEBEAT` (username=filebeat_internal)
   2. set `$ESPW_METRICBEAT` (username=metricbeat_internal)
   3. set `$ESPW_LOGSTASH_INTERNAL` (username=logstash_internal)
   4. set `$ESPW_LOGSTASH` (username=logstash_system)
   5. set `$ESPW_KIBANA` (username=kibana)

## DevOps Stack

1. `google-cloud-platform` (aka `gcp`): **Cloud server** which all services deployed to
2. `onuser` (aka `online-user`): **Main service** for query online user from paymentplus apis
3. `prometheus`: **Time-series database** keeps collecting data from `onuser`, `elasticsearch`, and `kibana`
4. `grafana`: **Visualize and monitor solution** for `prometheus` and `elasticsearch`
5. `filebeat`: **Log files collector** is one of a beat services in ELK Stack
6. `metricbeat`: **Systems and services collector** is one of a beat services in ELK Stack
7. `heartbeat`: **Systems and services availability collector** is one of a beat services in ELK Stack
8. `elasticsearch`: **Searching and analyze data realtime** is one of a beat services in ELK Stack
9.  `kibana`: **Visualize elasticsearch data** is one of a beat services in ELK Stack

## Miscellaneous

### Links

This is a links to open the web ui or apis in this stack

#### External

External mean access outside of docker components

1. Grafana: http://localhost:3100
2. Kibana: http://localhost:3101
3. Prometheus: http://localhost:3200
4. Elasticsearch: http://localhost:3201
5. Onuser exporter: http://localhost:3501/metrics
6. Elasticsearch exporter: http://localhost:3502/metrics

#### Internal

Internal mean access inside docker components

1. Grafana: http://grafana:3100
2. Kibana: http://kibana:5601
3. Prometheus: http://prometheus:9090
4. Elasticsearch: http://elasticsearch:9200
5. Onuser exporter: http://onuser:1234/metrics
6. Elasticsearch exporter: http://elasticsearch-exporter:9114/metrics

### FAQ

1. [filebeat.yml](filebeat.yml) and [metricbeat.yml](metricbeat.yml) must own by root
2. every data directory must call `sudo chown -R 1000:1000 data`

## Credit

1. Author: [Kamontat Chantrachirathumrong](https://kamontat.net)
2. Since: Feb 14, 2020
3. License: [MIT](https://opensource.org/licenses/MIT)