#!/bin/bash
cd "$(realpath "$(dirname "$0")")" &&
docker build -f Dockerfile -t prez-websec .

