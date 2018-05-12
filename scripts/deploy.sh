#!/bin/bash

BRANCH=$1

now -t $NOW_TOKEN --public --docker --name radar-dasboard-$BRANCH \
  && now -t $NOW_TOKEN alias radar-dasboard-$BRANCH \
  && now -t $NOW_TOKEN remove radar-dasboard-$BRANCH --safe

exit 0
