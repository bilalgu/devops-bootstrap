# DevOps Bootstrap Stack

A minimalist and production-like DevOps project that provisions infrastructure, automates configuration, and deploys secure and scalable web services using containers.

## Objectives

Build a reusable and production-like DevOps stack designed for backend developers and infrastructure engineers.

It includes:

- **Infrastructure as Code** with Terraform (provisions AWS EC2)
    
- **Configuration Management** with Ansible
    
- **Containerized Multi-Service Architecture**:
    
    - `traefik` – Reverse proxy for centralized HTTP routing
        
    - `web` – Static frontend (served via Nginx)
        
    - `back` – API backend (plug any Node.js / Flask project)
        
    - `db` – PostgreSQL database (initialized via SQL if needed)
        
    - `cadvisor` – Live container and host metrics
        
    - `prometheus` – Metric collection and querying
        
- **Security hardening**:
    
    - SSH protection, fail2ban, nftables firewall
        
    - Docker-safe rule injection at boot time (systemd)
        
- **CI/CD Pipeline** with GitHub Actions (triggered on push)


***

This stack is both:

- a **public portfolio** for DevOps/Cyber/cloud practices
    
- a **real-world template** to deploy and test backend APIs
    
- a **sandbox** to learn, iterate, and demonstrate production setups


## Deployment

```bash
cd terraform/
terraform init
terraform plan
terraform apply

cd ../configuration/ansible/
ansible-playbook -i inventory.ini playbook.yml
```

## Results

```bash
# Main entrypoints:
curl http://<EC2_PUBLIC_IP>                   # frontend
curl http://<EC2_PUBLIC_IP>/api/health        # backend health check
curl http://<EC2_PUBLIC_IP>/api/articles      # backend article list
curl http://<EC2_PUBLIC_IP>/monitoring/query  # Prometheus UI
```

> ⚠️ Backend routes depend on the API mounted into the stack.
> *To learn more, see [Step 8 – Use Case](docs/08-use-case-api.md)*

### Option 1 – Manual

Replace `<EC2_PUBLIC_IP>` by your instance’s public IP:

```bash
curl http://1.2.3.4
```

### Option 2 – Dynamic (AWS CLI)

```bash
EC2_PUBLIC_IP=$(aws ec2 describe-instances \
  --filters Name=tag:Name,Values=devops-bootstrap-instance \
  --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' \
  --output text)

curl http://$EC2_PUBLIC_IP
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
