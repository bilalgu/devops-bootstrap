# Step 8 – Use Case: Backend API as a Service

**Objective:**

Demonstrate how a backend developer can deploy a production-ready API (Node.js + PostgreSQL) in minutes using the DevOps Bootstrap Stack.

**Use Case:**

- An external API project is mounted in the stack (`use-case-node-api/`)
- The API exposes routes:
  - `/api/health` – healthcheck
  - `/api/articles` – sample article list from database
- The database is automatically initialized using `init.sql`

**Notes:**

- All your backend routes must start with `/api`
- Otherwise, Traefik won’t forward requests to the backend container

> *To learn more, see [Step 6 – Architecture](06-architecture-v2.md)*

**File structure:**

1. Use case backend example:

```
└── use-cases/
    └── use-case-node-api/
        ├── app.js
        ├── Dockerfile
        ├── init.sql
        ├── package.json
        └── utils/
            └── db.js
```

2. Where it’s integrated in the stack:

```
├── configuration/      
│   └── ansible/                   
│       ├── roles/
│       │   ├── deploy_compose_stack/
│       │   │   ├── files/
│       │   │   │   ├── docker-compose.yml
│       │   │   │   ├── use-cases/
│       │   │   │   │   └── use-case-node-api/ <--- there !
│       │   │   └── tasks/
│       │   │       └── main.yml
```

**Deployment:**

1. Copy the backend API use case into the stack:

```bash
cp -r use-cases/use-case-node-api/ configuration/ansible/roles/deploy_compose_stack/files/use-cases/
```

2. In the `docker-compose.yml`, update the following:

```yaml
back:
  build: ./use-cases/use-case-node-api  # <-- here
  depends_on:
    db:
      condition: service_healthy
```

```yaml
db:
  image: "postgres:alpine"
  volumes:
    - ./use-cases/use-case-node-api/init.sql:/docker-entrypoint-initdb.d/init.sql:ro  # <-- here
```

3. Run the playbook:

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
````

**Validation:**

Option 1 – Manual:

```bash
curl http://<EC2_PUBLIC_IP>/api/health
curl http://<EC2_PUBLIC_IP>/api/articles
```

Option 2 – Dynamic (AWS CLI):

```bash
EC2_PUBLIC_IP=$(aws ec2 describe-instances \
  --filters Name=tag:Name,Values=devops-bootstrap-instance \
  --query 'Reservations[*].Instances[*].NetworkInterfaces[*].Association.PublicIp' \
  --output text)

curl http://$EC2_PUBLIC_IP/api/health
curl http://$EC2_PUBLIC_IP/api/articles
```