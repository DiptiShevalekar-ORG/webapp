
sudo mkdir /opt/webappUnzipped
sudo groupadd csye6225

sudo useradd -g csye6225 csye6225
sudo usermod -s /sbin/nologin csye6225


sudo mv /tmp/webapp.zip /opt/
sudo unzip -o /opt/webapp.zip -d /opt/webappUnzipped

sudo chown -R csye6225:csye6225 /opt/webappUnzipped/Dipti_Shevalekar_002245703_01
sudo systemctl enable mysqld

cd /opt/webappUnzipped/Dipti_Shevalekar_002245703_01
sudo rm -rf node_modules
sudo npm install

sudo mv /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/packer/systemdSetup.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable systemdSetup.service
sudo systemctl restart systemdSetup.service
