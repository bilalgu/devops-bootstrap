# Step 6 - V2 Architecture : Multi-Service Stack (Web / API / DB)

**Objective :**

Design a realistic and scalable container-based architecture composed of three services :

- `web` - Frontend (static files : HTML/CSS/JS)
- `back` - Backend/API (Node.js or Flask)
- `db` - Database (PostgreSQL)

**Notes :**

- All services communicate via an internal Docker network (`app-net`)
- Only the `web` service is exposed to the internet (surface minimized)
- `back` and `db` are internal-only services
- db stores data persistently using a Docker volume

**Next step :**

Create a `docker-compose.yml` file that implements this architecture.