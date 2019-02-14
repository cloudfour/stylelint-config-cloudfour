# stylelint-config-cloudfour

[![NPM version](http://img.shields.io/npm/v/stylelint-config-cloudfour.svg)](https://www.npmjs.org/package/stylelint-config-cloudfour) [![Build Status](https://travis-ci.org/spaceninja/stylelint-config-spaceninja.svg?branch=master)](https://travis-ci.org/spaceninja/stylelint-config-spaceninja)

> A sharable stylelint config object that enforces [Cloud Four's CSS Standards](https://github.com/cloudfour/guides/tree/master/css)

Note that this config mostly just extends the [SUIT config](https://github.com/suitcss/stylelint-config-suitcss), and any additions or changes from the SUIT standard should be well-documented here to explain the deviation.

## Installation

Install [stylelint](https://stylelint.io/) and `stylelint-config-cloudfour`:

```
npm install stylelint cloudfour/stylelint-config-cloudfour --save-dev
```

## Usage

If you've installed `stylelint-config-cloudfour` locally within your project, just set your `stylelint` config to:

```js
{
  "extends": "stylelint-config-cloudfour"
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
