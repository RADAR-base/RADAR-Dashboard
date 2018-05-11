#!/bin/bash

BRANCH=$1

yarn deploy --name radar-dasboard-$BRANCH --token $NOW_TOKEN
yarn deploy:alias radar-dasboard-$BRANCH --token $NOW_TOKEN

exit 0
