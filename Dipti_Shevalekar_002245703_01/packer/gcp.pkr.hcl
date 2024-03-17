packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1"
    }
  }
}
source "googlecompute" "Assignment04" {
  project_id   = var.gcp_project_id
  source_image = var.the_source_image
  ssh_username = var.gcp_ssh_username
  zone         = var.gcp_project_zone
  network      = "default"
  subnetwork   = "defaul-subnet"
  image_name   = "cloud-packer-vm-custom-image"
}
build {
  sources = ["googlecompute.Assignment04"]
  provisioner "shell" {
    scripts = [
      "packer/installNode.sh",
      "packer/unzipInstall.sh",
      "packer/installmysql.sh"

  }
  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp.zip"
    destination = "/tmp/webapp.zip"
  }


  # provisioner "file" {
  #   source      = "/home/runner/work/webapp/webapp/.env"
  #   destination = "/tmp/.env"
  ///ExecStartPre=/bin/bash -c 'while [[ ! -f /opt/temp.txt ]]; do sleep 1; done'
  //sudo systemctl enable mysqld
  //sudo mv /tmp/.env /opt/webappUnzipped/Dipti_Shevalekar_002245703_01
  # }


  provisioner "shell" {
    scripts = [
      "packer/unzipAndSystemd.sh"
    ]
  }
}