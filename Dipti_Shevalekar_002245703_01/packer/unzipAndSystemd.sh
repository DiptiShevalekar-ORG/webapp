
sudo mkdir /tmp/webappUnzipped
sudo unzip -o /tmp/webapp.zip -d /tmp/webappUnzipped
sudo mv /tmp/webappUnzipped/Dipti_Shevalekar_002245703_01/packer/systemdSetup.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable systemdSetup.service
