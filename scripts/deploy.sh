#!/bin/bash

rsync -rvz --delete-after --exclude=questionnaire --exclude=coverage \
  $TRAVIS_BUILD_DIR/dist/ $DEPLOY_USER@$DEPLOY_SERVER:/www/dashboard

rsync -rvz --delete-after \
  $TRAVIS_BUILD_DIR/coverage/ $DEPLOY_USER@$DEPLOY_SERVER:/www/dashboard/coverage

exit 0
