# community-structure-of-football-player-dataset

Find similar players from a given player's name

## Download and extract dataset files, put them in the main repository folder
https://drive.google.com/drive/folders/1T9-6E_NjslB2zHbWxT_MRdL1M4auTIAA?usp=sharing

## Run

Running the first time by executing these commands

```bash
$ make build
$ make run
```

It will create a container named **csofpn**. You now can access it through **http://localhost:3000/**

## Test

Testing requires to mount current working directory into the container. So run these commands:

```bash
$ make build
$ make test
```

It will create a container named **csofpn_test** and mount current directory to **/app_test** directory inside the container.

## Rebuild

Re-build container requires you to delete the existed container named **csofpn** in order to creating a new one. Running this script:

```bash
$ ./rm.sh
```

## Check logs

```bash
$ docker logs -f csofpn
```
