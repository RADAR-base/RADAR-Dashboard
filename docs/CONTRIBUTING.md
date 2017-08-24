## Contributing

[Pull Requests](https://github.com/RADAR-CNS/RADAR-Dashboard/pulls) and [Issues](https://github.com/RADAR-CNS/RADAR-Dashboard/issues) are more than welcome!

## Guidelines for submitting a Pull Request

We follow the git-flow standard for branching:
- http://nvie.com/posts/a-successful-git-branching-model/
- https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow
- https://danielkummer.github.io/git-flow-cheatsheet/  

- When opening a PR for a specific issue already open, please use the `address #[issue number]` or `closes #[issue number]` syntax in the PR.
- Please keep your changes succinct in scope. Large pull requests with multiple changes to the codebase (i.e. multiple features) may be asked to be broken into multiple smaller pull requests.
- Please add unit tests for new features or functionality.

## Test and lint scripts

Use this command to run all checks:
```
$ npm run all
```

Check `package.json` for all available scripts.
