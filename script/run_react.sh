#!/bin/sh

cd /app/frontend

while true; do
  echo "Starting frontend react service"
  npm start

  sleep 5
done