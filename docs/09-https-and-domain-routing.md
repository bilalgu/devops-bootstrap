# Step 9 – HTTPS & Domain Routing

**Objective:**

Enable secure access to all services via HTTPS using a real domain name and automatic certificate generation with Let’s Encrypt (via Traefik).

*Allow port 443 in the AWS security group created in [Step 1 – Provisioning](01-provisioning.md)*

**Notes:**

- Real domain name: `prodstack.xyz` (registered via Dynadot — $2 !!!!! all my money)

- The stack supports two deployment modes:
	- local/demo → no HTTPS
	- production → full HTTPS with domain and TLS

- DNS can be updated automatically via the Dynadot API  
  *(requires an account and API access key)*

- Docker’s automatic chain rules allow access to these ports even if not explicitly opened via `nftables`.
	- *(But still need to allow them in the AWS security group — cloud firewall vs VM firewall)*

- Traefik stores the Let’s Encrypt TLS certificates in `acme.json`

**File structure:**

```
├── configuration/
│   └── ansible/       
│       ├── inventory.ini
│       ├── roles/
│       │   ├── deploy_compose_stack/
│       │   │   ├── files/
│       │   │   │   ├── docker-compose-https.yml
│       │   │   │   ├── docker-compose-http.yml
│       │   │   │   ├── letsencrypt/
│       │   │   │   │   └── acme.json
│       │   │   │   ├── traefik.yml
│       │   │   └── tasks
│       │   │       └── main.yml
├── terraform/
│   ├── main.tf
```

**Deployment:**

1. Choose deployment mode in `inventory.ini`:

```ini
use_https=true        # or false
```

2. Update DNS records via the Dynadot API  
	*Required only if `use_https=true`*

```bash
API_KEY="<INSERE_YOUR_KEY>"
DOMAIN="prodstack.xyz"

EC2_PUBLIC_IP=$(aws ec2 describe-instances \
  --filters Name=tag:Name,Values=devops-bootstrap-instance \
  --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' \
  --output text)

curl "https://api.dynadot.com/api3.xml?key=$API_KEY&command=set_dns2&domain=$DOMAIN&main_record_type0=a&main_record0=$EC2_PUBLIC_IP&subdomain0=www&sub_record_type0=a&sub_record0=$EC2_PUBLIC_IP"

curl "https://api.dynadot.com/api3.xml?key=$API_KEY&command=get_dns&domain=$DOMAIN"
```

3. Run the playbook:

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
```

**Validation:**

```bash
curl https://prodstack.xyz
curl https://prodstack.xyz/api/health
curl https://prodstack.xyz/api/articles
curl https://prodstack.xyz/monitoring/query

curl https://www.prodstack.xyz
curl https://www.prodstack.xyz/api/health
curl https://www.prodstack.xyz/api/articles
curl https://www.prodstack.xyz/monitoring/query
```