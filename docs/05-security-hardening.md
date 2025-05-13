# Step 5 - SSH Hardening & Intrusion Protection

**Objective :**

Prevent unauthorized access attempts by :

- Enforcing key-based SSH authentification
- Disabling password login
- Detecting and banning IPs with brute-force behavior

**File structure :**

```
├── configuration/
│   └── ansible/
│       └── roles/
│           └── security_hardening/
│               ├── files/
│               │   ├── jail.local
│               │   └── sshd-ec2connect.conf
│               ├── tasks/
│               │   └── main.yml
│               └── templates/
│                   └── sshd_config.j2
```

**Notes :**

- SSH configuration applied through Ansible template module
- Custom `fail2ban` jail targeting EC2-specific SSH logs
- Uses a `prefregex`-based filter (`sshd-ec2connect.conf`)
- Ban IPs after 3 failed attempts in 10 minutes

**Deployment :**

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
```

**Validation :**

1. Attempt an SSH connection without key

```bash
ssh -o "IdentitiesOnly=yes" ubuntu@<EC2_PUBLIC_IP>
```

2. Check the fail2ban jail's status in the EC2 VMs

```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP>
sudo fail2ban-client status sshd-ec2connect
```
