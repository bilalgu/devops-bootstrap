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

1. Update the `inventory.ini` file with the instance's public IP

```bash
cd configuration/ansible/
sed -i 's/<EC2_PUBLIC_IP>/w.x.y.z/' inventory.ini
```

2. Execute the playbook

```bash
ansible-playbook -i inventory.ini playbook.yml
```

**Verification :**

```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> docker -v
```
