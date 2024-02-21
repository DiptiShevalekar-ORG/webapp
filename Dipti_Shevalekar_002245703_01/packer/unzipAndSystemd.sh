unzip -o ~/webapp.zip -d /tmp/webapp
sudo mv /tmp/webapp/your_service_file.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable your_service_file.service
