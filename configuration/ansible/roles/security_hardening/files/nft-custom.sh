#!/bin/bash

if nft list table ip filter | grep -q INPUT; then
        echo 'Chain already exists'
        exit 0
fi

nft add chain ip filter INPUT '{ type filter hook input priority 0 ; }'
nft add rule ip filter INPUT tcp dport 22 accept
nft chain ip filter INPUT '{ policy drop ; }'
nft add rule ip filter INPUT ct state related,established accept
nft add rule ip filter INPUT udp dport 53 accept