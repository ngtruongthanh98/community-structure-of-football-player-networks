TARGET := community-structure-of-football-player-networks
SOURCES := ./
NAME := csofpn

build:
	sudo docker build -t ${TARGET}:latest .
test:
	sudo docker stop csofpn_test
	sudo docker rm csofpn_test
	sudo docker run -dit -p 3000:3000 -p 9999:9999 -v $(shell pwd):/app_test --name csofpn_test ${TARGET}:latest
run:
	sudo ./rm.sh
	sudo docker run -dit -p 3000:3000 -p 9999:9999 --name csofpn ${TARGET}:latest
    