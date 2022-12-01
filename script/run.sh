#!/bin/sh
trap "" 1
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd "${SCRIPTPATH}"
echo "SCRIPT PATH: ${SCRIPTPATH}"
echo "Starting all process"
./run_python.sh &
./run_go.sh &
./run_react.sh