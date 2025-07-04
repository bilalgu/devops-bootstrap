# DevOps Bootstrap Stack – Infra cloud prête à déployer

> **Automatisez et sécurisez vos déploiements cloud en quelques commandes.**  
> Gagnez du temps, évitez les erreurs, et posez une base saine pour faire évoluer vos projets.


Cette stack est conçue pour **aider les CTOs et startups tech à :**

- Déployer proprement un backend/API **sans galères manuelles**
- Avoir une **pipeline CI/CD fiable**, un monitoring clair, et une base de sécurité dès le départ
- Travailler avec une **infra reproductible, lisible et documentée**, qui évite les surprises en prod

**En clair :** Vous partez sur une fondation **automatisée et sécurisée**, qui tient la route à long terme.

## Ce que contient cette stack

Un **exemple concret**, prêt à cloner et adapter :

- **Terraform** – Provisionnement cloud (AWS EC2)
- **Ansible** – Configuration système et durcissement
- **Docker + Traefik** – Architecture multi-service (frontend, backend, DB)
- **Prometheus + cAdvisor** – Monitoring des métriques machines & conteneurs
- **Loki + Promtail + Grafana** – Centralisation et visualisation des logs
- **GitHub Actions** – Pipeline CI/CD déclenché sur chaque push

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
curl http://<EC2_PUBLIC_IP>  # frontend
curl http://<EC2_PUBLIC_IP>/api/health  # backend health check
curl http://<EC2_PUBLIC_IP>/api/articles  # backend article list
curl http://<EC2_PUBLIC_IP>/monitoring/prometheus/query  # Prometheus UI
curl -I http://<EC2_PUBLIC_IP>/monitoring/grafana  # Grafana UI (logs)
```

> ⚠️ Backend routes depend on the API mounted into the stack.
> *To learn more, see [Step 8 – Use Case](docs/08-use-case-api.md)*

> *To explore the Grafana interface and centralized logs (Traefik, backend, etc.), see [Step 9 – Centralized Logging & Dashboards](docs/09-logging-dashboards.md).*

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

Si vous êtes CTO, dev lead ou startup et que vous voulez :
- Mettre votre projet en ligne proprement
- Partir sur une fondation solide
- Ou simplement discuter de la manière d’industrialiser ça

📬 **Écrivez-moi :**
## Me contacter

- 🔗 [Mon LinkedIn](https://www.linkedin.com/in/bilal-guirre-395544221/)
- 📧 bilal.guirre.pro@proton.me