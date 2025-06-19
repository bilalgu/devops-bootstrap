# Step 9 - Centralized Logging & Dashboards

**Objective :**

Collect and visualize logs from all running containers using a minimal, production-like stack composed of Loki, Promtail, and Grafana — routed through Traefik.

**File structure :**

```
├── configuration/
│   └── ansible/
│       ├── playbook.yml
│       ├── roles/ 
│       │   ├── deploy_compose_stack/
│       │   │   ├── files/
│       │   │   │   ├── docker-compose.yml
│       │   │   │   ├── promtail-config.yml  
│       │   │   ├── tasks/
│       │   │   │   └── main.yml
│       │   │   └── templates/
│       │   │       └── env.j2
```

**Notes :**

- Promtail reads logs directly from `/var/lib/docker/containers/`
- Grafana must be explicitly configured to serve from a subpath when not at root (`GF_SERVER_ROOT_URL`)
	- A `.env` file is generated via Ansible to inject this variable in `docker-compose.yml`
- All logs are queryable from a single point, offering real-time debugging

**Deployment :**

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
````

**Validation :**

1. Visit the following URLs :
    

```bash
http://<EC2_PUBLIC_IP>/monitoring/loki/ready
http://<EC2_PUBLIC_IP>/monitoring/grafana
```

(Wait until `http://<EC2_PUBLIC_IP>/monitoring/loki/ready` returns `ready`)

2. In Grafana, go to the **Explore** tab → select **Loki** and run a basic query :
    

```
{job="dockerlogs"}
```

This will normally show logs from services like `traefik`, `web`, or `back`.

>*Log file names follow the form `/var/lib/docker/containers/<container_id>/*.log`.  To retrieve the associated container name:*

```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> sudo docker inspect --format '{{.Name}}' <container_id_prefix>
```

*(The first few digits are usually sufficient.)*

3. A minimal dashboard JSON is available at: [[docs/grafana/docker-logs-dashboard.json]]

To import it: go to **Dashboards** → **New** → **Import**, and upload the JSON file.