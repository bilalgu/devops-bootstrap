# DevOps Bootstrap Stack – Infra cloud prête à déployer

> Déployez rapidement un backend/API dans un environnement sécurisé et automatisé – en quelques commandes


Ce projet est un **modèle DevOps complet** conçu pour les développeurs, CTO ou freelances qui veulent :

- Déployer proprement une API/backend sans galères d'infra
- Avoir un pipeline CI/CD, une base de sécurité, et du monitoring dès le départ
- Travailler avec une stack reproductible, documentée et adaptée à un usage réel

## Ce que contient cette stack

- **Terraform** – Provisionnement d’une instance AWS EC2
- **Ansible** – Configuration système
- **Docker + Traefik** – Stack multi-service (frontend, backend, DB)
- **Prometheus + cAdvisor** – Monitoring applicatif et machine
- **GitHub Actions** – Pipeline CI/CD sur `main`

> Utilisable comme :
> - Modèle pour vos projets clients
> - Base d’apprentissage DevOps solide
> - Template freelance à adapter rapidement

## Objectifs du projet (version originale)

A minimalist and production-like DevOps project that provisions infrastructure, automates configuration, and deploys secure and scalable web services using containers.

This stack is both:

- a **public portfolio** for DevOps/Cyber/cloud practices
- a **real-world template** to deploy and test backend APIs
- a **sandbox** to learn, iterate, and demonstrate production setups

### Deployment

```bash
cd terraform/
terraform init
terraform plan
terraform apply

cd ../configuration/ansible/
ansible-playbook -i inventory.ini playbook.yml
```

### Results

```bash
# Main entrypoints:
curl http://<EC2_PUBLIC_IP>                   # frontend
curl http://<EC2_PUBLIC_IP>/api/health        # backend health check
curl http://<EC2_PUBLIC_IP>/api/articles      # backend article list
curl http://<EC2_PUBLIC_IP>/monitoring/query  # Prometheus UI
```

> ⚠️ Backend routes depend on the API mounted into the stack.
> *To learn more, see [Step 8 – Use Case](docs/08-use-case-api.md)*

#### Option 1 – Manual

Replace `<EC2_PUBLIC_IP>` by your instance’s public IP:

```bash
curl http://1.2.3.4
```

#### Option 2 – Dynamic (AWS CLI)

```bash
EC2_PUBLIC_IP=$(aws ec2 describe-instances \
  --filters Name=tag:Name,Values=devops-bootstrap-instance \
  --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' \
  --output text)

curl http://$EC2_PUBLIC_IP
```


### CI/CD Pipeline

This project uses a GitHub Actions workflow to automatically deploy any changes made to `app/` or `configuration/ansible/`

Each push to the `main` branch triggers the workflow, which :

1. Sets up a SSH connection to the AWS EC2 instance (**Important**: requires setting 3 repository secrets: `EC2_HOST`, `EC2_USER`, and `SSH_PRIVATE_KEY` )
2. Executes the Ansible playbook
	- Update the server configuration
	- Rebuild the Docker image
	- Redeploy the Nginx container

> CI/CD tests were first validated on a dedicated branch (`ci/test-pipeline`) before merging into `main`.

***

## Qui suis-je

Je m'appelle Bilal. 
J’aime bâtir des infrastructures **robustes, lisibles et sécurisées** — des fondations qui tiennent la route, et qui permettent d’itérer vite et bien.

Si tu bosses sur un projet backend/API et que tu veux :
- Gagner du temps sur ton déploiement
- Sécuriser ta stack dès le début
- Ou bosser avec quelqu’un qui apprend vite et s’implique vraiment

Écris-moi :
## Me contacter

🔗 [Mon LinkedIn](https://www.linkedin.com/in/bilal-guirre-395544221/)
📧 bilal.guirre.pro@proton.me