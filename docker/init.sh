#!/usr/bin/env bash
set -e

echo '==' && echo "==> Enviroment variables"
    PROJ=${PROJ:-'RADAR-Dashboard'}
    PROJ_FOLDER="/opt/${PROJ}"
    echo PROJ=${PROJ}

    API_URI=${API_URI:-'http://radar-restapi.eu-west-1.elasticbeanstalk.com/api'}
    echo API_URI=${API_URI}

    BRANCH=${BRANCH:-'master'}
    echo BRANCH=${BRANCH}

echo '==' && echo "==> Initiate project?"
    INIT_FILE="${PROJ_FOLDER}/.dockerinit"
    if [ -f ${INIT_FILE} ]; then source ${INIT_FILE}; fi
    INIT=${INIT:-YES}
    echo INIT=${INIT}

# initiate project
if [ ${INIT} == YES ]; then

    # git clone PROJ
    echo '==' && echo "==> Cloning ${PROJ} from GitHub"
        cd /opt
        git clone --depth 1 "https://github.com/RADAR-CNS/${PROJ}.git" --branch ${BRANCH}

    # replace API_URI in AppConfig
    echo '==' && echo "==> Replace API_URI"
        cd ${PROJ_FOLDER}/src/environments
        FIND="(API_URI)(.*?[:])(.*?['](.*?[']))"
        REPLACE="\\1\\2 \'$API_URI\'"
        sed -ri "s|${FIND}|${REPLACE}|" environment.prod.ts
        cat -n environment.prod.ts

    # yarn install and build
    echo '==' && echo "==> Installing dependencies and building App"
        cd ${PROJ_FOLDER}
        yarn
        yarn build
        rm -rf /var/www/*
        cp -a ${PROJ_FOLDER}/dist/. /var/www

    echo '==' && echo "==> ${PROJ} initiated"
        echo -e "INIT=NO" >> ${INIT_FILE}

fi

echo '==' && echo "==> Starting nginx in the foreground"
    nginx -g "daemon off;"

exec "$@"
