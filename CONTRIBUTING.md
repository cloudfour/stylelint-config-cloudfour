# Contributing Guide

## Supported versions

`engines.node` and the `stylelint` peer dependency in `package.json` are promises to users: this config works with every Node and stylelint version they allow. CI checks both ends of those ranges:

- **The newest.** The `ci` job runs lint and the tests on the current Node LTS, with the stylelint version in the lockfile, which Renovate keeps current.
- **The oldest.** The `test-oldest-supported` job runs the tests on the oldest Node each part of `engines.node` allows (`>=20.19.0` gives 20.19.0), with the oldest published stylelint the peer range allows. It reads those from `package.json` when it runs, so the workflow has no version numbers to keep in step.

To reproduce the oldest run locally, switch to the oldest Node (for example `nvm use 20.19.0`), then:

```sh
npm ci
npm install --no-save stylelint@17.10.0   # the oldest in the peer range
npm test
npm ci   # restore the lockfile version
```

### When the oldest-version job fails

This usually happens in one of two ways:

- **A change here uses a stylelint feature newer than our peer range**, such as a rule added in a later minor. Raise the peer range to the version that added it. If it's a release where users on the old version were already broken, as in 12.0.1, that's a bug fix. Otherwise it's a breaking change, as below.
- **A Renovate PR updates a dependency that needs a newer Node or stylelint** than we claim. Our dependencies are pinned, so the PR only reaches users when we release, but merging it means the next release breaks for them. Either hold the dependency back with a rule in `.renovaterc.json` that has a `description` saying why and when it can be removed, or raise the floor in a major release.

Don't delete or skip the job to get a PR through. A red job means a range in `package.json` is wrong, and removing the job only hides that from us, not from users.

### Changing a range

Edit `engines.node` or `peerDependencies` in `package.json`. The CI job follows them, so there's nothing else to update in the workflow. Update the example versions above if they change. `__tests__/engines.test.js` checks that `engines.node` matches what stylelint itself supports.

- **Raising the oldest version** drops support for someone, so it's a breaking change and needs a major release. Good reasons to raise it: that Node line has reached [end of life](https://nodejs.org/en/about/previous-releases), a dependency we need requires a newer version, or we want a newer stylelint feature.
- **Lowering it**, or supporting another stylelint major, is a minor release, as long as the oldest-version job passes.

Either way, record the change in `CHANGELOG.md`.

## Release Process

[How to publish an updated version](https://cloudfour.com/thinks/how-to-publish-an-updated-version-of-an-npm-package/)
