# DevOps Bootstrap Stack

Automatically provisions a minimalist cloud infrastructure to host a simple web service, in a realistic and reproducible DevOps context.

## Objectives

Build a DevOps stack that includes:

- Infrastructure as Code with Terraform
- Cloud VM provisioning on AWS
- Automated configuration with Ansible *(coming soon)*
- Containerized web service deployment *(coming soon)*
- CI/CD pipeline *(coming soon)*

This project serves as a technical portfolio, a personal learning environment, and a solid foundation for more advanced DevOps/Cyber/Cloud scenarios.

## Step 1: Provisioning with Terraform

**Goal:** Automatically create an Ubuntu 22.04 EC2 instance with SSH access, using Terraform only.

**Prerequisites:**

- An AWS account with an IAM user and access keys
- Locally generated SSH key pair
- Terraform installed
- AWS CLI configured (`aws configure`)

**Project structure:**

```
terraform
├── main.tf
├── terraform.tfvars
└── variables.tf
```


**Deployment:**

```bash
cd terraform/
terraform init
terraform plan
terraform apply

ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<PUBLIC-IP>
```