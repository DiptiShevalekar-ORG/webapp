# variable "gcp_project_id"{
#     default = "cloudassignment03-413923"
# }

# variable "gcp_project_zone"{
#     default="us-east1-b"
# }

# variable "gcp_ssh_username"{
#     default = "packer"
# }

# variable "the_source_image"{
# default="centos-stream-8-v20240110"
# }



variable "gcp_project_id" {
  default = "cloudassignment03-413923"
}

variable "gcp_project_zone" {
  default = "us-east1-b"
}

variable "gcp_ssh_username" {
  default = "packer"
}

variable "the_source_image" {
  default = "centos-stream-8-v20240110"
}


variable "network" {
  default = "default"
}

variable "subnetwork" {
  default = "defaul-subnet"
}