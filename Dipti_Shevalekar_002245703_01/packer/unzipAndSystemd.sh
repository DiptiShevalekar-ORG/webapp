
sudo mkdir /opt/webappUnzipped
sudo mv /tmp/webapp.zip /opt/
sudo unzip -o /opt/webapp.zip -d /opt/webappUnzipped

cd /opt/webappUnzipped/Dipti_Shevalekar_002245703_01
sudo rm -rf node_modules
sudo npm install

sudo mv /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/packer/systemdSetup.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable systemdSetup.service
