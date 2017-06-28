#!/bin/bash

BRANCH=$0

if [[ ${BRANCH} == "master" ]]; then
  # build project without base-href
  npm run build

  rsync -rvz --delete-after \
    --exclude=builds \
    --exclude=questionnaire \
    --exclude=coverage \
    ${TRAVIS_BUILD_DIR}/dist/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:/www/dashboard

  rsync -rvz --delete-after \
    ${TRAVIS_BUILD_DIR}/coverage/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:/www/dashboard/coverage

  echo Deployed ${BRANCH} to /

else
  # add base-href with build path
  npm run build -- --base-href /builds/${TRAVIS_BUILD_NUMBER}/

  rsync -rvz --delete-after \
    ${TRAVIS_BUILD_DIR}/dist/ \
    ${DEPLOY_USER}@${DEPLOY_SERVER}:/www/dashboard/builds/${TRAVIS_BUILD_NUMBER}

  echo Deployed ${BRANCH} to /builds/${TRAVIS_BUILD_NUMBER}/

fi

exit 0
