# Roadmap - DevOps Bootstrap Stack

This project evolves across structured technical blocks.

The objective is to build a secure, scalable, and production-like DevOps stack — while demonstrating real-world use cases.

## Version 3.0.0

| Area                  | Objective                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| Template API Use Case | Build and document a backend API deployed as-a-service with CI/CD and production best practices |
| HTTPS & DNS           | Add secure routing with HTTPS and custom domain                                                 |
| Logs & Dashboards     | Centralize logs and visualize them                                                              |
| Alerting              | Define alerts on key metrics or system events                                                   |
| Documentation         | Create a use-case-oriented section for backend developers                                       |

### HTTPS & DNS - Experimental Branch

Work was conducted between to implement:

- Automated DNS provisioning via Dynadot API  
- Let’s Encrypt certificate issuance via Traefik (HTTP challenge)  
- Custom domain routing with wildcard/subdomain support  
- DNS propagation handling and mitigation of ACME timeouts  

Despite significant progress, the implementation revealed high complexity and low ROI at this stage. 
Effort has been preserved in a separate branch:  
`https-dns-experiments`

Will return stronger !

### Experimental (Future ideas)

| Area              | Objective                                               |
| ----------------- | ------------------------------------------------------- |
| Kubernetes        | Test migration to container orchestration               |
| Multi-environment | Define staging/prod environments with GitOps-style flow |
| Self-hosted Git   | Run own Git service + self-hosted CI (Gitea + Drone?)   |
