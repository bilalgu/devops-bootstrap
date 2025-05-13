# Step 3 - Static Site Deployment in Docker via Ansible

**Objective :**

Build a lightweight Docker image serving a static site with Nginx and deploy it into the EC2 instance with Ansible.

**Prerequisites :**

- Docker installed on the EC2 instance ([Step2](02-configuration-ansible))

**File structure :**

```
├── configuration/
│   └── ansible/ 
│       ├── inventory.ini      
│       ├── playbook.yml
│       └── roles/
│           ├── nginx_container/
│           │   ├── files/
│           │   │   ├── Dockerfile
│           │   │   └── index.html
│           │   └── tasks/        
│           │       └── main.yml
```

**Notes :**

- The Ansible role `nginx_container` :

	1. Copies the `Dockerfile` and `index.html` to the `/tmp` on the EC2 instance
	2. Builds the Docker image on the remote host
	3. Runs the container `nginx_site` with the port 80 exposed

- Port 80 is open due to a security group created defined in `terraform/main.tf`

**Deployment :**

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
```

**Validation :**

```bash
curl <EC2_PUBLIC_IP>
```
