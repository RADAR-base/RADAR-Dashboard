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

FROM mhart/alpine-node:10

LABEL maintainer="Maximilian Kerz @kerzmaximilian, Amos Folarin @afolarin, Joris Borgdorff @blootsvoets, Herculano Campos @herkulano"

ENV PROJ="RADAR-Dashboard"
ENV PROJ_FOLDER="/opt/${PROJ}"

# copy project files to build
RUN echo && echo "==> Copy files to build ${PROJ}"
COPY *.json *.js ${PROJ_FOLDER}/
COPY src ${PROJ_FOLDER}/src

# install and build
RUN echo && echo "==> Installing dependencies and building App" \
  && cd ${PROJ_FOLDER} \
  && yarn install --pure-lockfile \
  && yarn ng -- --version \
  && yarn build \
  && echo

FROM nginx:1.13.12-alpine

LABEL org="RADAR-CNS"
LABEL name="RADAR-Dashboard"
LABEL version="2.1.0"

ENV PROJ="RADAR-Dashboard"
ENV PROJ_FOLDER="/opt/${PROJ}"

# add init script
COPY ./docker/default.nginx /etc/nginx/conf.d/default.conf
COPY ./docker/init.sh .

COPY --from=0 ${PROJ_FOLDER}/dist /var/www

# specify volume path
VOLUME /var/www/assets/environments

# expose internal port:80 and run init.sh
EXPOSE 80
CMD ["./init.sh"]
