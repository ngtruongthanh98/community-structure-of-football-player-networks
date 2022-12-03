#!/bin/bash

python3 -m grpc_tools.protoc -I../grpc --python_out=../graph --pyi_out=../graph --grpc_python_out=../graph ../grpc/exchange.proto