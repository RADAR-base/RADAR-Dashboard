# RADAR-CNS Frontend Dashboard App

[![Build Status](https://travis-ci.org/RADAR-CNS/RADAR-Dashboard.svg?branch=develop)](https://travis-ci.org/RADAR-CNS/RADAR-Dashboard) [![bitHound Dependencies](https://www.bithound.io/github/RADAR-CNS/RADAR-Dashboard/badges/dependencies.svg)](https://www.bithound.io/github/RADAR-CNS/RADAR-Dashboard/develop/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/RADAR-CNS/RADAR-Dashboard/badges/devDependencies.svg)](https://www.bithound.io/github/RADAR-CNS/RADAR-Dashboard/develop/dependencies/npm)

An [Angular](https://angular.io/) and [D3](https://d3js.org/) web application to manage and monitor research data from the [RADAR-CNS Platform](http://radar-cns.org/).

## Install
Install [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/docs/install). We prefer the use of `yarn`, but it's not a requirement, if you prefer `npm` replace `yarn` commands for `npm`.

We use [angular-cli](https://github.com/angular/angular-cli) so you can use all of it's commands, like the generator. Please read its documentation for further information.

If you and want to use angular-cli's commands globally install it:
```
$ npm install -g angular-cli
```

In the project folder run `yarn` to install dependencies:
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
$ yarn css
```

## Contributing
PR's and issues are welcome. When creating a PR make sure all tests pass. In case of a new feature add unit tests.

## Supporting Partners
We thank our supporting partners who have been a tremendous help in streamlining our development process.

![Browserstack_logo](https://raw.githubusercontent.com/RADAR-CNS/RADAR-Dashboard/master/docs/supportive-partners-src/brwsrstck.png)
