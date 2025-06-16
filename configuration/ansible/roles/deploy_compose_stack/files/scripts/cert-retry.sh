#!/bin/bash
MAX_ATTEMPTS=3
ATTEMPT_INTERVAL=40

cd /opt/devops-bootstrap/

for ((i=1; i<=MAX_ATTEMPTS; i++)); do
    echo "[Attempt $i] check the Traefik logs..."

    docker-compose up -d

    sleep $ATTEMPT_INTERVAL

    echo "===== DOCKER logs ======="
    docker logs devops-bootstrap_traefik_1
    
    if docker logs devops-bootstrap_traefik_1 | grep -q "ERR.*Unable to obtain ACME certificate"; then
        echo "ACME failed restart the stack"
        docker-compose down -v
    else
        echo "Traefik ACME seems ok"
        exit 0
    fi

done

echo "Failed after $MAX_ATTEMPTS attempts"
exit 1