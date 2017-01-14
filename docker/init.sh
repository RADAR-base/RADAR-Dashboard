#!/usr/bin/env bash
set -e

echo '==' && echo "==> Enviroment variables"
    echo PROJ=${PROJ}
    echo PROJ_FOLDER=${PROJ_FOLDER}

    API_URI=${API_URI:-'http://radar-restapi.eu-west-1.elasticbeanstalk.com/api'}
    echo API_URI=${API_URI}

echo '==' && echo "==> Replace API_URI"
    cd /var/www

    # regex patterns
    FILE="index.html"
    FIND="(API_URI[^\"\']*)(.*)(,)"
    REPLACE="\\1\'${API_URI}\'\\3"

    # replace API_URI value
    sed -ri "s|${FIND}|${REPLACE}|" ${FILE}

    # check replacement
    cat ${FILE}

echo '==' && echo "==> Starting nginx in the foreground"
    nginx -g "daemon off;"

exec "$@"
