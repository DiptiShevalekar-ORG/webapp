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
  source_image_family = var.the_source_image
  ssh_username = var.gcp_ssh_username
  zone         = var.gcp_project_zone
  network      = "default"
  subnetwork   = "defaul-subnet"
  #   ssh_agent_auth      = true
  #   ssh_private_key_file = "/Users/dshev/.ssh/gcp_key.pub"
}

build {
  sources = ["googlecompute.Assignment04"]
  provisioner "shell" {
    scripts = [
      "packer/installmysql.sh",
      "packer/installNode.sh",
      "packer/unzipInstall.sh"

    ]
  }
  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/.env"
    destination = "/tmp/.env"
  }

  provisioner "shell" {
    scripts = [
      "packer/unzipAndSystemd.sh"
    ]
  }

}



