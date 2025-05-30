# Step 1 - Infrastructure Provisioning with Terraform

**Objective :**

Automatically create a EC2 instance (Ubuntu 22.04) on AWS with a dedicated SSH key, using Infrastructure as Code.

**Prerequisites :**

- An AWS account with Free Tier access
- An IAM user with access/secret keys
- A local SSH key pair (ex : `~/.ssh/devops-bootstrap.key`)
- Terraform
- AWS CLI

**File structure :**

```
terraform/
├── main.tf
├── terraform.tfvars
└── variables.tf
```

**Deployment :**

```bash
cd terraform/
terraform init
terraform plan
terraform apply
```

**Verification :**

```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP>
```

To retrieve `<EC2_PUBLIC_IP>` via `aws cli` :

```bash
aws ec2 describe-instances \
  --filters Name=tag:Name,Values=devops-bootstrap-instance \
  --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' \
  --output text
```
