# Step 5 - SSH Hardening & Intrusion Protection

## SSH hardening & fail2ban

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
│                   └── sshd_config
│               ├── tasks/
│               │   └── main.yml
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
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> sudo fail2ban-client status sshd-ec2connect
```

***

## Firewall configuration with nftables

**Objective :**

Add firewall rules at boot time without interfering with Docker's dynamic rules.

**File structure :**

```
├── configuration/
│   └── ansible/
│       └── roles/
│           └── security_hardening/
│               ├── files/
│               │   ├── nft-custom.service
│               │   ├── nft-custom.sh
│               └── tasks/
│                   └── main.yml
```

**Notes :**

- Allow only SSH, DNS, and related/established connections
- Avoid overwriting Docker chains
- We use `nftables` instead of `iptables` because is expected to be deprecated in the future :
	- [Red Hat Bugzilla - iptables will eventually be removed](https://bugzilla.redhat.com/show_bug.cgi?id=1873474#c4)
	- [nftables official project page](https://netfilter.org/projects/nftables/index.html)
- A custom script `/usr/local/bin/nft-custom.sh` adds the rules dynamically and a systemd unit `nft-custom.service` runs this script at boot

**Deployment :**

```bash
cd configuration/ansible
ansible-playbook -i inventory.ini playbook.yml
```

**Validation :**

List active rules

```bash
ssh -i ~/.ssh/devops-bootstrap.key ubuntu@<EC2_PUBLIC_IP> sudo nft list ruleset
```

