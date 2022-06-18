#!/bin/sh
ip-killswitch-activate || {
    echo "IP killswitch has failed!"
    exit 5
}
ip -br a &&
cd /app &&
sudo -Hu server node app.js

