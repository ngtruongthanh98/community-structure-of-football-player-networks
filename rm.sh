#!/bin/bash

if [ "$(docker ps -a -f name=csofpn)" ]; then
    sudo docker stop csofpn
    sudo docker rm csofpn
    
fi


