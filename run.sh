#!/bin/bash
docker rm prez-websec
docker run --cap-add NET_ADMIN \
           --name prez-websec \
           -it \
           prez-websec

