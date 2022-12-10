#!/bin/bash

export PATH="$PATH:$(go env GOPATH)/bin"
python3 -m grpc_tools.protoc -I../grpc --python_out=../graph --pyi_out=../graph --grpc_python_out=../graph ../grpc/exchange.proto
~/.local/bin/protoc --proto_path=../grpc/ --go_out=../backend/grpc --go_opt=paths=source_relative --go-grpc_out=../backend/grpc --go-grpc_opt=paths=source_relative ../grpc/exchange.proto