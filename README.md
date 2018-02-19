# RADAR-CNS Frontend Dashboard App

[![Build Status](https://travis-ci.org/RADAR-base/RADAR-Dashboard.svg?branch=master)](https://travis-ci.org/RADAR-base/RADAR-Dashboard) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/d32926d9ac8c4f0292025b8207ba1f6d)](https://www.codacy.com/app/herkulano/RADAR-Dashboard?utm_source=github.com&utm_medium=referral&utm_content=RADAR-CNS/RADAR-Dashboard&utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/d32926d9ac8c4f0292025b8207ba1f6d)](https://www.codacy.com/app/herkulano/RADAR-Dashboard?utm_source=github.com&utm_medium=referral&utm_content=RADAR-CNS/RADAR-Dashboard&utm_campaign=Badge_Coverage) [![Coverage Status](https://coveralls.io/repos/github/RADAR-CNS/RADAR-Dashboard/badge.svg?branch=master)](https://coveralls.io/github/RADAR-CNS/RADAR-Dashboard?branch=master)

An [Angular](https://angular.io/) and [D3](https://d3js.org/) web application to manage and monitor research data from the [RADAR-CNS Platform](http://radar-cns.org/).

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

For [Typescript](http://www.typescriptlang.org/) and [Angular](https://angular.io/) we loosely follow the [Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html) and we use [TSLint](https://github.com/palantir/tslint/) and [Codelyzer](https://github.com/mgechev/codelyzer) to check these guidelines.

For [SCSS](http://sass-lang.com/) we use [StyleLint](https://github.com/stylelint/stylelint), [StyleFmt](https://github.com/morishitter/stylefmt) and [PostCSS Sorting](https://github.com/hudochenkov/postcss-sorting) to format and lint the code.

Use the following command after you make changes to the SCSS and before a PR to run `stylefmt` and `postcss-sorting` and format the code.

```
$ yarn fix:css
```

## Contributing

[Read /docs/CONTRIBUTING.md](https://github.com/RADAR-CNS/RADAR-Dashboard/blob/develop/docs/CONTRIBUTING.md)

## Code of Conduct

[Read /docs/CODE_OF_CONDUCT.md](https://github.com/RADAR-CNS/RADAR-Dashboard/blob/develop/docs/CODE_OF_CONDUCT.md)

## Docker

Create docker image:

```
$ docker build -t radarcns/radar-dashboard ./
```

Or pull from [dockerhub](https://hub.docker.com/r/radarcns/radar-dashboard/):

```
$ docker pull radarcns/radar-dashboard:latest
```

Run docker image locally:

```
$ docker run -d -p 3030:80 --name radar-dashboard radarcns/radar-dashboard:latest
```

The dashboard will be running at `http://localhost:3030`

### Docker environment parameters

The environment parameters are set in `docker run` so they can be overridden by `docker-compose`. More information in [https://docs.docker.com](https://docs.docker.com/compose/environment-variables/#/setting-environment-variables-in-containers).

Change `BASE_HREF` if the application is running under a subfolder, e.g., `https://radar-cns.org/dashboard`

```bash
BASE_HREF='/dashboard/'
```

Change `API_URI` to set the API endpoint of the application

```bash
API_URI='https://radar-cns.ddns.net/api'
```

## Supporting Partners

We thank our supporting partners who have been a tremendous help in streamlining our development process.

![Browserstack_logo](https://raw.githubusercontent.com/RADAR-CNS/RADAR-Dashboard/develop/docs/supportive-partners-src/brwsrstck.png)
