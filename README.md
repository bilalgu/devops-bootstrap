# DevOps Bootstrap Stack

A minimalist realistic DevOps project that provisions cloud infrastructure, configures it automatically, and deploys a secure, scalable, and containerized web service.

## Objectives

Build a DevOps stack that includes:

- Infrastructure as Code with Terraform (AWS EC2 provisioning)
- Configuration Management with Ansible
- Containerized Multi-Service Stack :
	- `web` - static frontend (Nginx)
	- `back` - API (Node.js with Express)
	- `db` - (PostgreSQL)
- Security hardening (SSH + firewall + fail2ban + nftables)
- CI/CD pipeline via GitHub Actions

This project serves as a technical portfolio, a personal learning environment, and a solid foundation for more advanced DevOps/Cyber/Cloud scenarios.

## Deployment

```bash
cd terraform/
terraform init
terraform plan
terraform apply

cd configuration/ansible/
ansible-playbook -i inventory.ini playbook.yml
```

## Results

```bash
curl <EC2_PUBLIC_IP>
# curl http://<EC2_PUBLIC_IP>
# or simply open your browser

ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> curl localhost:8080/hello

ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> curl localhost:8080/health
```

You can get `<EC2_PUBLIC_IP>` with :

```bash
aws ec2 describe-instances --filters Name=tag:Name,Values=devops-bootstrap-instance --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' | grep [0-9] | sed -e 's/ *//' -e 's/"//g'
```

## CI/CD Pipeline

This project uses a GitHub Actions workflow to automatically deploy any changes made to `app/` or `configuration/ansible/`

Each push to the `main` branch triggers the workflow, which :

1. Sets up a SSH connection to the AWS EC2 instance (**Important**: requires setting 3 repository secrets: `EC2_HOST`, `EC2_USER`, and `SSH_PRIVATE_KEY` )
2. Executes the Ansible playbook
	- Update the server configuration
	- Rebuild the Docker image
	- Redeploy the Nginx container

> CI/CD tests were first validated on a dedicated branch (`ci/test-pipeline`) before merging into `main`.
