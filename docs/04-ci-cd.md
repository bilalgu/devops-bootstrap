# Step 4 - Continuous Deployment with GitHub Actions

**Objective :**

Automatically redeploy the application container when file related to the application change.

**Prerequisites :**

- Repository GitHub Secrets :

	- `EC2_HOST` : <EC2_PUBLIC_IP>
	- `EC2_USER` : SSH user (`ubuntu`)
	- `SSH_PRIVATE_KEY` : private key to access EC2 server

**File structure :**

```
├── .github/
│   └── workflows/
│       └── deploy.yml
```

**Notes :**

- This setup simulates a lightweight production CI/CD pipeline
- The workflow triggered only if changes occur in `configuration/ansible/**`

**Deployment :**

1. Create SSH connection from GitHub to EC2 (add `SSH_PRIVATE_KEY` to the `~/.ssh/autorized_keys` file on the EC2 instance)
2. Run the Ansible playbook with updated files
