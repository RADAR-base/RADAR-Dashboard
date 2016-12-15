#!/bin/bash

rsync -rvz --delete-after --exclude=questionnaire \
  'ssh' $TRAVIS_BUILD_DIR/dist/ $DEPLOY_USER@$DEPLOY_SERVER:/www/dashboard

exit 0
