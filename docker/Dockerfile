# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

## BUILD COMMAND
# docker build -t radarcns/dashboard ./

## RUN COMMAND
# docker run -p 3000:3000 --name radar-dashboard -t radarcns/dashboard

FROM node:7.4

MAINTAINER Herculano Campos <im@herkulano.com>

LABEL org="RADAR-CNS"
LABEL project="Dashboard"
LABEL version="1.0"

RUN echo && echo "==> Installing Components" \
    && apt-get -qq update \
    && apt-get install git \
    && npm install http-server -g --quiet

RUN echo && echo "==> Cloning RADAR-Dashboard from GitHub" \
    && cd /opt \
    && git clone --depth 1 "https://github.com/RADAR-CNS/RADAR-Dashboard.git"

RUN echo && echo "==> Installing dependencies and building App" \
    && mkdir www \
    && cd /opt/RADAR-Dashboard \
    && npm install --quiet \
    && npm run build \
    && cp -a /opt/RADAR-Dashboard/dist/. /www

EXPOSE 3000
ENTRYPOINT ["http-server", "/www"]
CMD ["-p", "3000"]
