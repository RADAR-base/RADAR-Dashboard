#!/usr/bin/env bash
set -e

echo '==' && echo "==> Enviroment variables"
    echo PROJ=${PROJ}
    echo PROJ_FOLDER=${PROJ_FOLDER}

    API_URI=${API_URI:-'https://radar-cns.ddns.net/api'}
    echo API_URI=${API_URI}

    BASE_HREF=${BASE_HREF:-'/'}
    echo BASE_HREF=${BASE_HREF}

echo '==' && echo "==> Replace API_URI & BASE_HREF"
    cd /var/www

    # file to replace
    FILE="index.html"

    # regex patterns for API_URI
    FIND="(API_URI[^\"\']*)(.*)(,)"
    REPLACE="\\1\'${API_URI}\'\\3"

    # replace API_URI value
    sed -ri "s|${FIND}|${REPLACE}|" ${FILE}

    # regex patterns for BASE_HREF
    FIND="(\<base\ href\=\")([^\"]+)"
    REPLACE="\\1${BASE_HREF}"

    # replace BASE_HREF value
    sed -ri "s|${FIND}|${REPLACE}|" ${FILE}

    # check replacement
    cat ${FILE}

echo '==' && echo "==> Starting nginx in the foreground"
    nginx -g "daemon off;"

exec "$@"
