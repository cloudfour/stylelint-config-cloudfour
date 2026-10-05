# stylelint-config-cloudfour

[![NPM version](http://img.shields.io/npm/v/stylelint-config-cloudfour.svg)](https://www.npmjs.org/package/stylelint-config-cloudfour) [![Build Status](https://github.com/cloudfour/stylelint-config-cloudfour/workflows/CI/badge.svg)](https://github.com/cloudfour/stylelint-config-cloudfour/actions?query=workflow%3ACI) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

> A sharable stylelint config object that enforces [Cloud Four's CSS Standards](https://github.com/cloudfour/guides/tree/main/css)

Note that this config mostly just extends [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard), plus [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) for Sass files, and any additions or changes from those standards should be well-documented here to explain the deviation.

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
  "lint:css": "stylelint '**/*.css'"
}
```

### Sass

Sass rules and the [SCSS parser](https://github.com/postcss/postcss-scss) only apply to `.scss` files. Plain `.css` files are parsed as CSS, so they get Stylelint's full set of validity rules, and none of the Sass rules. You don't need to configure anything for this. If your project uses Sass, include `.scss` files in your lint script:

```json
"scripts": {
  "lint:css": "stylelint '**/*.{css,scss}'"
}
```

#### Sass in other file types

Stylelint chooses a config for each file, not for each `<style>` block. By default, a Vue component's `<style lang="scss">` block is parsed correctly, but doesn't get the Sass rules.

If your Vue components mostly use Sass, you can apply the Sass config to them with `stylelint-config-cloudfour/scss`:

```js
{
  extends: ["stylelint-config-cloudfour"],
  overrides: [
    {
      files: ["**/*.vue"],
      extends: ["stylelint-config-cloudfour/scss"],
      customSyntax: "postcss-html",
    },
  ],
}
```

This gives `lang="scss"` blocks the Sass rules, but plain `<style>` blocks in those files lose the CSS validity rules that don't work with Sass.

### Using with Prettier

This config works with [Prettier](https://prettier.io/) without any extra setup. Stylelint [removed its formatting rules](https://stylelint.io/migration-guide/to-16#removed-deprecated-stylistic-rules) in v16, so [`stylelint-config-prettier`](https://github.com/prettier/stylelint-config-prettier) is no longer needed. This config also turns off the formatting rules that `stylelint-config-standard-scss` still enables, since Prettier handles them.

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

### Does this config enforce a naming convention?

No. This config disables the kebab-case naming patterns from `stylelint-config-standard-scss` for classes, IDs, custom properties, custom media, keyframes, cascade layers, containers, and Sass mixins, functions, variables, and placeholders, so that it works with naming conventions like [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). If you want to enforce a convention, add the pattern rules or a plugin like [stylelint-selector-bem-pattern](https://github.com/simonsmith/stylelint-selector-bem-pattern) to your own config.

### Extends

- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard): The standard shareable config for Stylelint.
- [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss): The standard shareable SCSS config for Stylelint. _`.scss` files only._

### Plugins

- [stylelint-declaration-block-no-ignored-properties](https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties): Disallow property values that are ignored due to another property value in the same rule.
- [stylelint-high-performance-animation](https://github.com/kristerkari/stylelint-high-performance-animation): Prevent the use of low performance animation and transition properties.
- [stylelint-order](https://github.com/hudochenkov/stylelint-order): Enforce the order of content within declaration blocks.

### Configured Lints

This is a list of the lints turned on in this configuration (beyond the ones that come from `stylelint-config-standard` and `stylelint-config-standard-scss`), and what they do.

- [`at-rule-empty-line-before`](https://github.com/stylelint/stylelint/blob/master/lib/rules/at-rule-empty-line-before/README.md): Require an empty line before at-rules. _disabled temporarily, pending [#2480](https://github.com/stylelint/stylelint/issues/2480)_
- [`comment-empty-line-before`](https://github.com/stylelint/stylelint/tree/master/lib/rules/comment-empty-line-before): Require an empty line before comments. _overriding the standard rule to exclude the first nested comment in a block._
- [`import-notation`](https://stylelint.io/user-guide/rules/import-notation/): Require `@import` paths to be strings, such as `@import 'foo.css'`, rather than `url()`. _overriding the standard rule to match the Sass convention._
- [`no-descending-specificity`](https://stylelint.io/user-guide/rules/list/no-descending-specificity/): Disallow selectors of lower specificity from coming after overriding selectors of higher specificity. _disabled due to false positives in SCSS contexts._
- [`rule-empty-line-before`](https://github.com/stylelint/stylelint/blob/master/lib/rules/rule-empty-line-before/): Require an empty line before multi-line rules. _overriding the standard rule to exclude the first multi-line rule in a block, and to ignore rules following comments._

#### Order

- [`order/order`](https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md): Specifies the order of content within declaration blocks: Variables, `@include` statements, declarations, block `@include` statements, nested rules.
- [`order/properties-alphabetical-order`](https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-alphabetical-order/README.md): Specify the alphabetical order of properties within declaration blocks.

#### SCSS

These only apply to `.scss` files. The Sass formatting rules from `stylelint-config-standard-scss`, such as `scss/operator-no-newline-after`, are turned off, since [Prettier](#using-with-prettier) handles formatting.

- [`at-rule-disallowed-list`](https://github.com/stylelint/stylelint/blob/main/lib/rules/at-rule-disallowed-list/README.md): Disallow use of `@extend` because it's [considered an anti-pattern](https://csswizardry.com/2016/02/mixins-better-for-performance/), and `@import` because it's [deprecated](https://sass-lang.com/documentation/at-rules/import)
- [`scss/declaration-nested-properties`](https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/declaration-nested-properties/README.md): Disallow SCSS nested property groups, such as `font { size: 16px; weight: 700; }`.
- [`scss/selector-no-redundant-nesting-selector`](https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/selector-no-redundant-nesting-selector/README.md): Disallow redundant nesting selectors (`&`).

#### Performance

- [`plugin/declaration-block-no-ignored-properties`](https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties): Disallow property values that are ignored due to another property value in the same rule, such as `width` with `display: inline`.
- [`plugin/no-low-performance-animation-properties`](https://github.com/kristerkari/stylelint-high-performance-animation): Prevent the use of low performance animation and transition properties that trigger `layout`.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
