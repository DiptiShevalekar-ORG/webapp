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
 // image_family = "trial_family"
  image_name   = "cloud-packer-vm-custom-image"
}
build {
  sources = ["googlecompute.Assignment04"]
  provisioner "shell" {
    scripts = [
      "packer/installNode.sh",
      "packer/unzipInstall.sh"
    ]
  }
  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "shell" {
    scripts = [
      "packer/unzipAndSystemd.sh",
      "packer/installOpsAgent.sh"
    ]
  }
  post-processor "manifest" {
    output = "manifest.json"
    strip_path =true
  }
}