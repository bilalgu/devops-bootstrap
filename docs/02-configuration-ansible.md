# Step 2 - Server Configuration with Ansible

**Objective :**

Provision a remote Ubuntu server with Docker installed, using Ansible over SSH.

**Prerequisites :**

- EC2 instance provisioned via Terraform
- SSH access with key (`~/.ssh/devops-bootstrap.key`)
- Ansible installed
- IP address of the EC2 instance

**File structure :**

```
├── configuration/
│   └── ansible/
│       ├── inventory.ini
│       ├── playbook.yml
```

**Deployment :**

1. Update the `inventory.ini` file with the instance's public IP **OR** generate a temporary file :

```bash
cat << EOF > generate-inventory.sh
#!/bin/bash

EC2_IP=$(aws ec2 describe-instances \
  --filters Name=tag:Name,Values=devops-bootstrap-instance \
  --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' \
  --output text)

echo "EC2_PUBLIC_IP : $EC2_IP"

cp configuration/ansible/inventory.ini configuration/ansible/tmp-inventory.ini
sed -i "s/<EC2_PUBLIC_IP>/$EC2_IP/" configuration/ansible/tmp-inventory.ini
EOF

chmod u+x generate-inventory.sh
./generate-inventory.sh
```

2. Execute the playbook

```bash
cd configuration/ansible/
ansible-playbook -i tmp-inventory.ini playbook.yml
```

**Verification :**

```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> docker -v
```
