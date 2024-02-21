packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1"
    }
  }
}

variable "gcp_project_id" {
  default = "cloudassignment03-413923"
}

variable "gcp_project_zone" {
  default = "us-east1-b"
}

variable "gcp_ssh_username" {
  default = "csye6225"
}

variable "the_source_image" {
  default = "centos-stream-8-v20240110"
}

source "googlecompute" "Assignment04" {
  project_id   = var.gcp_project_id
  source_image = var.the_source_image
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
    "installmysql.sh",
     "installNode.sh",
     "unzipInstall.sh"
    ]
  }
   provisioner "file" {
    source      = "webapp-zip"
    destination = "/tmp/webapp-zip"
  }

#  provisioner "shell" {
#     inline = [
#       "unzip /tmp/webapp-FORK.zip -d /tmp/"
#     ]
#   }

}



