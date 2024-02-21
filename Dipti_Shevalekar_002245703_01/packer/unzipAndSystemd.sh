
sudo mkdir /opt/webappUnzipped
sudo unzip -o /opt/webapp.zip -d /opt/webappUnzipped
sudo mv /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/packer/systemdSetup.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable systemdSetup.service
