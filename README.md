# stylelint-config-cloudfour

[![NPM version](http://img.shields.io/npm/v/stylelint-config-cloudfour.svg)](https://www.npmjs.org/package/stylelint-config-cloudfour) [![Build Status](https://travis-ci.org/cloudfour/stylelint-config-cloudfour.svg?branch=master)](https://travis-ci.org/cloudfour/stylelint-config-cloudfour) [![Renovate Status](https://badges.renovateapi.com/github/cloudfour/stylelint-config-cloudfour)](https://renovatebot.com/)

> A sharable stylelint config object that enforces [Cloud Four's CSS Standards](https://github.com/cloudfour/guides/tree/master/css)

Note that this config mostly just extends the [SUIT config](https://github.com/suitcss/stylelint-config-suitcss), and any additions or changes from the SUIT standard should be well-documented here to explain the deviation.

## Installation

Install [stylelint](https://stylelint.io/) and `stylelint-config-cloudfour`:

```
npm install stylelint stylelint-config-cloudfour --save-dev
```

## Usage

If you've installed `stylelint-config-cloudfour` locally within your project, just set your `stylelint` config to:

```js
{
  "extends": "stylelint-config-cloudfour"
}
```

You'll probably also want to add a script to your `package.json` file to make it easier to run Stylelint with this config:

```json
"scripts": {
  "lint:css": "stylelint '**/*.css'
}
```

### Using with Prettier

It's common to [pair Stylelint with Prettier](https://prettier.io/docs/en/integrating-with-linters.html#stylelint). If you're going to use both, you'll want to add [`stylelint-config-prettier`](https://github.com/prettier/stylelint-config-prettier), which is a config that disables any Stylelint rules that conflict with Prettier.

```
npm install stylelint-config-prettier --save-dev
```

Then add it to your Stylelint config. It'll need to be the last item in the `extends` array so it can override other configs.

```js
{
  extends: ["stylelint-config-spaceninja", "stylelint-prettier/recommended"],
}
```

Then you can update your `package.json` script to run Prettier as well as Stylelint:

```json
"scripts": {
  "lint:css": "prettier --list-different '**/*.css' && stylelint '**/*.css'
}
```

### Extending the config

Simply add a `"rules"` key to your config, then add your overrides and additions there.

For example, to change the `at-rule-no-unknown` rule to use its `ignoreAtRules` option, change the `indentation` to tabs, turn off the `number-leading-zero` rule,and add the `unit-whitelist` rule:

```js
{
  "extends": "stylelint-config-cloudfour",
  "rules": {
    "at-rule-no-unknown": [ true, {
      "ignoreAtRules": [
        "extends",
        "ignores"
      ]
    }],
    "indentation": "tab",
    "number-leading-zero": null,
    "unit-whitelist": ["em", "rem", "s"]
  }
}
```

## Documentation

### What's the difference between [stylelint-config-cloudfour-suit](https://github.com/cloudfour/stylelint-config-cloudfour-suit) and [stylelint-config-cloudfour](https://github.com/cloudfour/stylelint-config-cloudfour)?

[stylelint-config-cloudfour](https://github.com/cloudfour/stylelint-config-cloudfour) only contains the CSS formatting rules. [stylelint-config-cloudfour-suit](https://github.com/cloudfour/stylelint-config-cloudfour-suit) extends it, and additionally enforces the [SUIT naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). In most cases, you should use [stylelint-config-cloudfour-suit](https://github.com/cloudfour/stylelint-config-cloudfour-suit), but if your project doesn't follow the SUIT naming scheme, then you can use [stylelint-config-cloudfour](https://github.com/cloudfour/stylelint-config-cloudfour) directly.

### Extends

-   [stylelint-config-suitcss](https://github.com/suitcss/stylelint-config-suitcss): Configuration rules to ensure your CSS code is compliant with [SUIT CSS's code style](https://github.com/suitcss/suit/blob/master/doc/STYLE.md).

### Configured Lints

This is a list of the lints turned on in this configuration (beyond the ones that come from `stylelint-config-suitcss`), and what they do.

#### At-rule

-   [`at-rule-empty-line-before`](https://github.com/stylelint/stylelint/blob/master/lib/rules/at-rule-empty-line-before/): Require an empty line before at-rules, except blockless after blockless. _overriding SUIT rule to further exclude `@custom-media`, `@mixin`, `@import`, and `@for` rules._

#### Comments

-   [`comment-empty-line-before`](https://github.com/stylelint/stylelint/tree/master/lib/rules/comment-empty-line-before): Require an empty line before comments. _overriding SUIT rule to exclude the first nested comment in a block._

#### General / Sheet

-   [`max-line-length`](https://github.com/stylelint/stylelint/blob/master/lib/rules/max-line-length/): Limit line lengths to 80 characters for comments only. _overriding SUIT rule to ignore comments that contain URLs._

#### Rule

-   [`rule-empty-line-before`](https://github.com/stylelint/stylelint/blob/master/lib/rules/rule-empty-line-before/): Require an empty line before multi-line rules. _overriding SUIT rule to exclude the first multi-line rule in a block._

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
