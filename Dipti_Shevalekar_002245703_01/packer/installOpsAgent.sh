#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

#Adding the logging part --- dont forget adding logging:
sudo chown -R csye6225:csye6225 /var/log/
# echo "setting permissions"
# cd /var/log/
# sudo mkdir webapp
# sudo chown -R csye6225:csye6225 /var/log/webapp/

sudo chmod -R 775 /etc/google-cloud-ops-agent/
echo "permission set"
echo "moving file"
sudo mv /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/packer/config.yaml /etc/google-cloud-ops-agent/
echo "successfully moved the file"
sudo chmod -R 775 /etc/google-cloud-ops-agent/config.yaml

# sudo bash -c 'cat <<EOF > /etc/google-cloud-ops-agent/config.yaml
# logging: 
#   receivers:
#     my-app-receiver:
#       type: files
#       include_paths:
#         - /var/log/Webapp.log
#       record_log_file_path: true
#   processors:
#     my-app-processor:
#       type: parse_json
#       time_key: time
#       time_format: "%Y-%m-%dT%H:%M:%S.%L%Z"
#   service:
#     pipelines:
#       default_pipeline:
#         receivers: [my-app-receiver]
#         processors: [my-app-processor]
# EOF'


sleep 10
#sudo vi /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent
