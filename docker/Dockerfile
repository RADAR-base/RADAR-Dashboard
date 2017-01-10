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

FROM node:7.4

MAINTAINER Maximilian Kerz @kerzmaximilian, Amos Folarin @afolarin, Herculano Campos @herkulano

LABEL org="RADAR-CNS"
LABEL name="RADAR-Dashboard"
LABEL version="1.0"

# install git nginx yarn
RUN echo && echo "==> Installing Components" \
    && curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg \
        | apt-key add - \
    && echo "deb http://dl.yarnpkg.com/debian/ stable main" \
        | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -qq \
    && apt-get install -y git nginx yarn \
    && echo

# forward request and error logs to docker log collector
RUN echo && echo "==> Setup nginx" \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && echo

# override default nginx config
COPY default.nginx /etc/nginx/sites-available/default

# add init script
COPY entrypoint.sh .

# expose internal port:80 and run init.sh
EXPOSE 80
CMD ["./entrypoint.sh"]
