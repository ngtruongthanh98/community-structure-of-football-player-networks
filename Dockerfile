FROM ubuntu:20.04

# install tools
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y build-essential autoconf libtool pkg-config cmake net-tools telnet nano curl git wget tzdata


# install nodejs v16.x
RUN curl -fsSL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh && bash /tmp/nodesource_setup.sh
RUN apt-get install -y nodejs


# install go
RUN wget https://go.dev/dl/go1.17.7.linux-amd64.tar.gz && rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.7.linux-amd64.tar.gz
ENV PATH="${PATH}:/usr/local/go/bin"

WORKDIR /app
COPY . .

CMD /app/script/run.sh