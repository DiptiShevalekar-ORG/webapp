#!/bin/bash

curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
cd /var/log/
sudo mkdir webapp
sudo chown -R csye6225:csye6225 /var/log/webapp/

echo "permission set"
echo "moving file"

sudo mv /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/packer/config.yaml /etc/google-cloud-ops-agent/
echo "successfully moved the file"


sleep 10

sudo systemctl restart google-cloud-ops-agent
