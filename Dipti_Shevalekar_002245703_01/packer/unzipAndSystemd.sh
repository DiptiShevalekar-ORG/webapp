
sudo mkdir /opt/webappUnzipped
sudo groupadd csye6225

sudo useradd -g csye6225 csye6225
sudo usermod -s /sbin/nologin csye6225


sudo mv /tmp/webapp.zip /opt/
sudo unzip -o /opt/webapp.zip -d /opt/webappUnzipped

sudo chown -R csye6225:csye6225 /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/

cd /opt/webappUnzipped/Dipti_Shevalekar_002245703_01
sudo rm -rf node_modules
sudo npm install

sudo mv /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/packer/systemdSetup.service /etc/systemd/system/
sudo chown -R csye6225:csye6225 /etc/systemd/system/systemdSetup.service
sudo chmod 770 /opt/webappUnzipped/Dipti_Shevalekar_002245703_01/
sudo chmod 770 /etc/systemd/system/systemdSetup.service
sudo systemctl daemon-reload
sudo systemctl enable systemdSetup.service
sudo systemctl start systemdSetup.service
cd /opt/webappUnzipped/Dipti_Shevalekar_002245703_01
sudo node server.js
