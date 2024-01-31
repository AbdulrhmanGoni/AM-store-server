#!/bin/bash

docker-compose -f docker-compose-test-replicas.yml up -d

sleep 3

chmod +x scripts/mongodb-replicas-init.sh

docker exec mongodb1 ./scripts/mongodb-replicas-init.sh
