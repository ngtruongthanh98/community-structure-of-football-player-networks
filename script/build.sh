#!/bin/sh
trap "" 1
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd "${SCRIPTPATH}"
echo "SCRIPT PATH: ${SCRIPTPATH}"
echo "Building all process"
./build_graph.sh
./build_go.sh
./build_react.sh