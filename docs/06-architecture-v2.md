# Step 6 - V2 Architecture : Multi-Service Stack (Web / API / DB)

**Objective :**

Design and deploy a realistic and scalable container-based architecture composed of three services :

- `web` - Frontend (static files : HTML/CSS/JS served by Nginx)
- `back` - Backend/API (Node.js with Express)
- `db` - Database (PostgreSQL)

*The Ansible role created in [Step3](03-niginx-deployment.md) has been replaced by web*

**File structure :**

```
├── configuration/
│   └── ansible/
│       └── roles/
│           ├── deploy_compose_stack/
│           │   ├── files/
│           │   │   ├── backend/
│           │   │   │   ├── Dockerfile
│           │   │   │   ├── index.js
│           │   │   │   └── package.json
│           │   │   ├── docker-compose.yml
│           │   │   └── web/
│           │   │       ├── Dockerfile
│           │   │       └── index.html
│           │   └── tasks/
│           │       └── main.yml
```

**Notes :**

- The full stack runs via `docker-compose`
- All services communicate through an internal Docker network (`app-net`)
- Only the `web` service is exposed to the internet (minimized surface)
- `back` and `db` are internal-only services
- `db` stores data persistently using a Docker volume
- A healthcheck is used to ensure the DB is ready before the API attempts to connect

**Deployment :**

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
```

**Validation :**

1. Check the `web` and `back` services

```bash
curl <EC2_PUBLIC_IP>

ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> curl localhost:8080/hello

ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> curl localhost:8080/health
```

2. Inspect the service container's logs

```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> sudo docker logs devops-bootstrap_back_1

ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> sudo docker logs devops-bootstrap_web_1

ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> sudo docker logs devops-bootstrap_db_1
```

3. Check the data persistence

- 3.1 Inspect the volume :


```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP>
sudo -i
docker volume ls
docker volume inspect devops-bootstrap_pgdata
```

- 3.2 Create a test table :

```bash
docker exec -it devops-bootstrap_db_1 psql -U appuser -d appdb
```

```sql
CREATE TABLE test (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO test(username)
VALUES('devops-bootstrap');

SELECT * FROM test;

\q
```

- 3.3 Remove, restart the stack and check again :

```bash
cd /opt/devops-bootstrap
docker-compose down
docker-compose up -d
docker exec -it devops-bootstrap_db_1 psql -U appuser -d appdb
```

```sql
SELECT * FROM test;
```

***

**Next step :**

- Introduce Traefik to centralize HTTP routing