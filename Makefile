TARGET := community-structure-of-football-player-networks
SOURCES := ./

build:
	sudo docker build -t ${TARGET}:latest .
test:
	sudo docker stop csofpn_test
	sudo docker rm csofpn_test
	sudo docker run -dit -p 3000:3000 -v $(shell pwd):/app_test --name csofpn_test ${TARGET}:latest
run:
	sudo docker run -dit -p 3000:3000 --name csofpn ${TARGET}:latest