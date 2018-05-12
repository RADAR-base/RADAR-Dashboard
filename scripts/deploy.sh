#!/bin/bash

BRANCH=$1
ID=$(now -t $NOW_TOKEN --public --docker --name radar-dasboard-$BRANCH)
now -t $NOW_TOKEN alias $ID radar-dasboard-$BRANCH
now -t $NOW_TOKEN remove radar-dasboard-$BRANCH --safe -y

exit 0
