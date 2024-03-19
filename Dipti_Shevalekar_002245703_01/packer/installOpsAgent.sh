#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install



cat <<EOF > /etc/google-cloud-ops-agent/config.yaml

receivers:
  my-app-receiver:
    type: files
    include_paths:
      - /var/Webapp.log
    record_log_file_path: true
    processors:
    my-app-processor:
      type: parse_json
      time_key: time
      time_format: "%Y-%m-%dT%H:%M:%S.%L%Z"
    service:
    pipelines:
      default_pipeline:
        receivers: [my-app-receiver]
        processors: [my-app-processor]

EOF

sudo vi /etc/google-cloud-ops-agent/config.yaml
sudo chmod -R 775 /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent
