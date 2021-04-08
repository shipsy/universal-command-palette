### Dev testing
1. Build tar
```
npm i
npm pack
```
2. In the target project install tar
```
npm i /path/to/tar
```

### Publish to npmjs
1. Generate npm_token from npmjs and add it to github secrets (inside repo settings)
(mind the [2-factor](https://snyk.io/blog/github-actions-to-securely-publish-npm-packages/))
2. Create release (currently the github action is configred to publish to npmjs on new release publish)
