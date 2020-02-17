# Usage

1. Setup **google cloud platform container registry**
2. Run `docker-compose up -d`
3. Add data source as **Prometheus**
   1. URL: http://prometheus:9090
   2. **Save and Test**
4. Add datasource as **Stackdriver**
   1. Download JWT token file from GCP
5. Add datasource as **Elasticsearch**
   1. URL: http://elasticsearch:9200
   2. Index name: **logstash-xxxxxxxxxxxxxx** (looking from kibana settings)
   3. version: 7.0+
   4. Max concurrent Shard Requests: 3
   5. Min time interval: 1m
6. Import Dashboard from grafana folder

# Link

1. Grafana: http://localhost:3100
2. Kibana: http://localhost:3101
3. Prometheus: http://localhost:3200
4. Elasticsearch: http://localhost:3201
5. Onuser service: http://localhost:3501
6. Node exporter: http://localhost:3502
7. Elasticsearch exporter: http://localhost:3503
8. Logstash: http://localhost:3800
