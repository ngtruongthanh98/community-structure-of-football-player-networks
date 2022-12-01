#!/bin/sh

cd /app/backend
go mod tidy
go build

while true; do
  echo "Starting backend echo service"
  ./community-structure

  sleep 5
done