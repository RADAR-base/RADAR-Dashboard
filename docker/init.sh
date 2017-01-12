#!/usr/bin/env bash
set -e

echo '==' && echo "==> Enviroment variables"
    echo BRANCH=${BRANCH}
    echo PROJ=${PROJ}
    echo PROJ_FOLDER=${PROJ_FOLDER}

    API_URI=${API_URI:-'http://radar-restapi.eu-west-1.elasticbeanstalk.com/api'}
    echo API_URI=${API_URI}

echo '==' && echo "==> Replace API_URI"
    cd /var/www

    # search file for main.*.bundle.js
    MAIN_FILE=$(find . -name "main.*.bundle.js")

    # regex patterns
    # replace API_URI value
    FIND="(API_URI:)([\"\'])(.*?)([\"\'])"
    API_URI=$(echo ${API_URI} | sed 's|\/|\\\/|g')
    REPLACE="\1\2$API_URI\4"
    perl -pi -e "s/${FIND}/${REPLACE}/" ${MAIN_FILE}

    # check replacement
    head -c 300 ${MAIN_FILE} && echo

    # rm previous gzip file
    # gzip main.*.bundle.js
    rm ${MAIN_FILE}.gz
    gzip -5 -c ${MAIN_FILE} > ${MAIN_FILE}.gz

echo '==' && echo "==> Starting nginx in the foreground"
    nginx -g "daemon off;"

exec "$@"
