# Step 9 – HTTPS & Domain Routing

**Objective:**

Add secure access to all services via HTTPS using a real domain name and automatic certificate generation with Let's Encrypt (via Traefik).

*Allow port 443 in the AWS security group created in [Step 1 – Provisioning](01-provisioning.md)*

**Notes:**

- Real domain name: `prodstack.xyz` (registered via Dynadot — $2 !!!!! all my money)

- Both HTTP and HTTPS are supported for now:
	- Traefik entrypoints:
	    - `web` (port 80)
	    - `websecure` (port 443)

- Docker’s automatic chain rules allow access to these ports even if not explicitly opened via `nftables`.
	- *(But still need to allow them in the AWS security group — cloud firewall vs VM firewall)*

- Traefik stores the auto-generated certificate from Let’s Encrypt in `acme.json`.

- DNS must point to the EC2 public IP.
	- *(Automatic HTTPS only works if DNS is correctly set)*

**Limitation:**

- Each time the EC2 instance is destroyed and recreated via Terraform:
	- The public IP changes
	- The DNS must be updated manually on Dynadot
	- This breaks automatic deployment for users who clone the repo

**File structure:**

```
├── configuration/           
│   └── ansible/    
│       ├── roles/         
│       │   ├── deploy_compose_stack/
│       │   │   ├── files/
│       │   │   │   ├── docker-compose.yml
│       │   │   │   ├── letsencrypt/
│       │   │   │   │   └── acme.json
│       │   │   │   ├── traefik.yml
│       │   │   └── tasks/
│       │   │       └── main.yml
├── terraform/
│   ├── main.tf
```

**Deployment:**

1. Manually update the DNS settings on [Dynadot](https://www.dynadot.com) to point to the new EC2 public IP (admin only):

> ⚠️ This setup is not yet production-ready. Manual DNS updates are required after each infrastructure change.

```bash
EC2_PUBLIC_IP=$(aws ec2 describe-instances \
  --filters Name=tag:Name,Values=devops-bootstrap-instance \
  --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' \
  --output text)

echo $EC2_PUBLIC_IP
# --> use this IP to update the A record
```

2. Run the playbook:

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
```

(You can also try with `http://` and compare in a browser with the secure version.)

**Next step:**

* Automatically redirect all HTTP to HTTPS (Traefik config)
* Add `www` subdomain
* Find a persistent or dynamic DNS solution to automate record updates