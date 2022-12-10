#!/bin/sh

cd /app/graph

while true; do
  echo "Starting graph python service"
  python3 server.py

  sleep 5
done