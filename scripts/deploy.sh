#!/bin/bash

BRANCH=$1
ROOT_FOLDER=/var/www/dashboard

if [[ ${BRANCH} == "master" ]]; then
  # add base-href with /master path
  yarn build --stats-json --base-href /master/

  rsync -rvz --delete-after \
    ${TRAVIS_BUILD_DIR}/dist/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:${ROOT_FOLDER}/master

  rsync -rvz --delete-after \
    ${TRAVIS_BUILD_DIR}/coverage/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:${ROOT_FOLDER}/master/coverage

  echo Deployed ${BRANCH} to /

elif [[ ${BRANCH} == "develop" ]]; then
  # add base-href with /develop path
  yarn build --stats-json --base-href /develop/

  rsync -rvz --delete-after \
    ${TRAVIS_BUILD_DIR}/dist/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:${ROOT_FOLDER}/develop

  rsync -rvz --delete-after \
    ${TRAVIS_BUILD_DIR}/coverage/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:${ROOT_FOLDER}/develop/coverage

  echo Deployed ${BRANCH} to /dev/

else
  # add base-href with build path
  yarn build --base-href /builds/${TRAVIS_BUILD_NUMBER}/

  rsync -rvz --delete-after \
    ${TRAVIS_BUILD_DIR}/dist/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:${ROOT_FOLDER}/builds/${TRAVIS_BUILD_NUMBER}

  echo Deployed ${BRANCH} to /builds/${TRAVIS_BUILD_NUMBER}/

fi

exit 0
