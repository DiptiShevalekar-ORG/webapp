unzip -o /tmp/webapp.zip -d /tmp/webapp
sudo mv /tmp/webapp/systemdSetup.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable systemdSetup.service
