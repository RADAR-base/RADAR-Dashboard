# RADAR-CNS Frontend Dashboard App

[![Build Status](https://travis-ci.org/RADAR-base/RADAR-Dashboard.svg?branch=master)](https://travis-ci.org/RADAR-base/RADAR-Dashboard) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/d32926d9ac8c4f0292025b8207ba1f6d)](https://www.codacy.com/app/herkulano/RADAR-Dashboard?utm_source=github.com&utm_medium=referral&utm_content=RADAR-base/RADAR-Dashboard&utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/d32926d9ac8c4f0292025b8207ba1f6d)](https://www.codacy.com/app/herkulano/RADAR-Dashboard?utm_source=github.com&utm_medium=referral&utm_content=RADAR-base/RADAR-Dashboard&utm_campaign=Badge_Coverage) [![Coverage Status](https://coveralls.io/repos/github/RADAR-CNS/RADAR-Dashboard/badge.svg?branch=master)](https://coveralls.io/github/RADAR-base/RADAR-Dashboard?branch=master)

An [Angular](https://angular.io/) and [D3](https://d3js.org/) web application to manage and monitor research data from the [RADAR-base Platform](http://radar-base.org/).

## Install

Install [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/en/docs/install).

We use [angular-cli](https://github.com/angular/angular-cli) so you can use all of it's commands, like the generator. Please read its documentation for further information.

If want to use angular-cli's commands you need to install it globally:

```
$ yarn global add @angular/cli
```

In the project folder install npm dependencies:

```
$ yarn
```

To run the application use:

```
$ yarn start
```

## Guidelines

Use the following command before commiting to fix common styling problems.

```
$ yarn fix:all
```

## Contributing

[Read /docs/CONTRIBUTING.md](https://github.com/RADAR-CNS/RADAR-Dashboard/blob/develop/docs/CONTRIBUTING.md)

## Code of Conduct

[Read /docs/CODE_OF_CONDUCT.md](https://github.com/RADAR-CNS/RADAR-Dashboard/blob/develop/docs/CODE_OF_CONDUCT.md)

## Docker

Create docker image:

```
$ docker build -t radarbase/radar-dashboard ./
```

Or pull from [dockerhub](https://hub.docker.com/r/radarbase/radar-dashboard/):

```
$ docker pull radarbase/radar-dashboard:latest
```

Run docker image locally:

```
$ docker run -d -p 3030:80 --name radar-dashboard radarbase/radar-dashboard:latest
```

The dashboard will be running at `http://localhost:3030`

### Docker environment parameters

The environment parameters are set in `docker run` so they can be overridden by `docker-compose`. More information in [https://docs.docker.com](https://docs.docker.com/compose/environment-variables/#/setting-environment-variables-in-containers).

Change `BASE_HREF` if the application is running under a subfolder, e.g., `https://radar-base.org/dashboard`

```bash
BASE_HREF='/dashboard/'
```

Change `API_URI` to set the API endpoint of the application

```bash
API_URI='https://radar-backend.co.uk/api/'
```

## Supporting Partners

We thank our supporting partners who have been a tremendous help in streamlining our development process.

![Browserstack_logo](https://raw.githubusercontent.com/RADAR-base/RADAR-Dashboard/develop/docs/supportive-partners-src/brwsrstck.png)
