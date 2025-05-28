# Step 7 – Infrastructure Monitoring

**Objective :**

Introduce real-time metrics and storage to monitor container-level performance and prepare for future alerting :

- `cadvisor` — exposes live container and host metrics
- `prometheus` — collects these metrics

**File structure :**

```
├── configuration/
│   └── ansible/
│       ├── roles/
│       │   ├── deploy_compose_stack/
│       │   │   ├── files/
│       │   │   │   ├── docker-compose.yml
│       │   │   │   ├── prometheus.yml
│       │   │   └── tasks/
│       │   │       └── main.yml
```

**Notes :**

- Only Prometheus is publicly accessible via Traefik
  - Port `9090` is no longer exposed externally
  - A `stripPrefix` middleware is used to route `/monitoring` → `/` for Prometheus
- Prometheus scrapes metrics from `cadvisor` every 5 seconds

**Deployment :**

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
````

**Validation :**

1. Visit the Prometheus interface:

```
http://<EC2_PUBLIC_IP>/monitoring/query
```

2. Check that `cadvisor` appears in **Status → Targets**

3. Try a basic query:

```promql
sum(container_memory_usage_bytes / 1024 / 1024) by (name)
```

4. Use the web UI to explore !