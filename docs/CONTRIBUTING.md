## Contributing
PR's and issues are welcome.

We follow the git-flow standard for branching:
- http://nvie.com/posts/a-successful-git-branching-model/
- https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow
- https://danielkummer.github.io/git-flow-cheatsheet/  

Keep this in mind before PRing:
- When creating a PR make sure all tests pass.
- In case of a new feature add unit tests.

Fix common stylelint issues and reorder properties before the PR:
```
$ npm run fix:css
```

You can use this command to run all checks:
```
$ npm run all
```
