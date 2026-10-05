# stylelint-config-cloudfour

[![NPM version](https://img.shields.io/npm/v/stylelint-config-cloudfour.svg)](https://www.npmjs.com/package/stylelint-config-cloudfour) [![Build Status](https://github.com/cloudfour/stylelint-config-cloudfour/workflows/CI/badge.svg)](https://github.com/cloudfour/stylelint-config-cloudfour/actions?query=workflow%3ACI) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

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

Stylelint chooses a config for each file, not for each `<style>` block. Since this config picks the Sass rules by file extension, files that embed styles, such as Vue components, get the CSS rules for every `<style>` block, including `<style lang="scss">` blocks. That works well if your components only use CSS. But if they use Sass, the CSS rules will report Sass features as errors (such as `@use`, `@include`, and `@mixin`, which are unknown at-rules in CSS), and the Sass rules won't run.

If your components use Sass, you can apply the Sass config to them with `stylelint-config-cloudfour/scss`:

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

Now every `<style>` block in your components is linted with the Sass rules.

##### What if my project uses both Sass and CSS?

This config can't fully support components that mix Sass and plain CSS. Because Stylelint applies one config to the whole file, enabling the Sass config means every `<style>` block is linted as Sass, even blocks that are plain CSS.

That won't cause false errors, since Sass is a superset of CSS. However, `stylelint-config-standard-scss` turns off some CSS rules because they misreport Sass syntax, and those rules won't run on any block. So your plain CSS won't be checked for these:

- [`annotation-no-unknown`](https://stylelint.io/user-guide/rules/annotation-no-unknown/)
- [`at-rule-descriptor-no-unknown`](https://stylelint.io/user-guide/rules/at-rule-descriptor-no-unknown/)
- [`at-rule-descriptor-value-no-unknown`](https://stylelint.io/user-guide/rules/at-rule-descriptor-value-no-unknown/)
- [`at-rule-prelude-no-invalid`](https://stylelint.io/user-guide/rules/at-rule-prelude-no-invalid/)
- [`declaration-property-value-no-unknown`](https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown/)
- [`media-feature-name-value-no-unknown`](https://stylelint.io/user-guide/rules/media-feature-name-value-no-unknown/)
- [`media-query-no-invalid`](https://stylelint.io/user-guide/rules/media-query-no-invalid/)
- [`no-duplicate-selectors`](https://stylelint.io/user-guide/rules/no-duplicate-selectors/)

### Using with Prettier

We recommend using [Prettier](https://prettier.io/) to format your CSS and Sass, and this config works with it without any extra setup.

As of v16, Stylelint [removed its formatting rules](https://stylelint.io/migration-guide/to-16#removed-deprecated-stylistic-rules), leaving formatting to dedicated tools like Prettier. That's why [`stylelint-config-prettier`](https://github.com/prettier/stylelint-config-prettier), which used to turn those rules off, is no longer needed. However, [`stylelint-config-standard-scss`](https://github.com/stylelint-scss/stylelint-config-standard-scss) still turns on formatting rules from [`stylelint-scss`](https://github.com/stylelint-scss/stylelint-scss), such as `scss/operator-no-newline-after`. Some of them conflict with how Prettier formats Sass. To match the intent of Stylelint's decision, this config turns those formatting rules off.

### Extending the config

To change or add rules, add a `rules` key to your config. Your rules take precedence over this config's.

For example, to teach `at-rule-no-unknown` about an at-rule from a PostCSS plugin, turn off `selector-not-notation`, and allow only certain units with `unit-allowed-list`:

```js
{
  extends: ["stylelint-config-cloudfour"],
  rules: {
    "at-rule-no-unknown": [true, { ignoreAtRules: ["define-mixin"] }],
    "selector-not-notation": null,
    "unit-allowed-list": ["em", "rem", "%", "s"],
  },
}
```

#### Changing rules for one file type

Rules in your `rules` key apply to every file, including `.scss` files. That matters for rules that this config only turns off for Sass. For example, `at-rule-no-unknown` is off for `.scss` files because it reports Sass at-rules like `@use` and `@include` as unknown, and setting it in your `rules` turns it back on for them.

If your project lints both CSS and Sass, use `overrides` to change a rule for one file type only:

```js
{
  extends: ["stylelint-config-cloudfour"],
  overrides: [
    {
      files: ["**/*.css"],
      rules: {
        "at-rule-no-unknown": [true, { ignoreAtRules: ["define-mixin"] }],
      },
    },
  ],
}
```

## Documentation

### Does this config enforce a naming convention?

No. This config disables the kebab-case naming patterns from `stylelint-config-standard-scss` for classes, IDs, custom properties, custom media, keyframes, cascade layers, containers, and Sass mixins, functions, variables, and placeholders, so that it works with naming conventions like [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). If you want to enforce a convention, add the pattern rules or a plugin like [stylelint-selector-bem-pattern](https://github.com/simonsmith/stylelint-selector-bem-pattern) to your own config.

### Does this config enforce logical properties?

Yes. [Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values), such as `margin-inline-start` instead of `margin-left`, describe layout relative to the text direction instead of the screen. This config flags physical properties, units, and keywords, and `stylelint --fix` converts them for you:

| Physical                                     | Logical                                                           |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `margin-left`, `padding-top`, `border-right` | `margin-inline-start`, `padding-block-start`, `border-inline-end` |
| `top`, `left`                                | `inset-block-start`, `inset-inline-start`                         |
| `width`, `max-height`                        | `inline-size`, `max-block-size`                                   |
| `100vw`, `50dvh`                             | `100vi`, `50dvb`                                                  |
| `float: left`, `text-align: right`           | `float: inline-start`, `text-align: end`                          |

Two exceptions are allowed, because browsers don't fully support their logical versions yet:

- `overflow-x` and `overflow-y`: `overflow-inline` and `overflow-block` need Safari 26 or later ([#662](https://github.com/cloudfour/stylelint-config-cloudfour/issues/662)).
- Physical keywords in `offset-anchor` and `offset-position`, such as `left top`: no browser supports the logical keywords yet ([#663](https://github.com/cloudfour/stylelint-config-cloudfour/issues/663)).

Shorthand properties with physical sides, such as `margin: 0 1rem 0 2rem`, aren't flagged yet ([stylelint/stylelint#9420](https://github.com/stylelint/stylelint/issues/9420)).

#### Writing direction

Stylelint can only convert physical properties if it knows the page's writing direction, because a physical side like `left` maps to a different logical side in each direction. This config assumes a left-to-right, top-to-bottom language like English. If your project uses another writing direction, such as right-to-left for Arabic or Hebrew, override it in your config:

```js
{
  extends: ["stylelint-config-cloudfour"],
  languageOptions: {
    directionality: {
      block: "top-to-bottom",
      inline: "right-to-left",
    },
  },
}
```

#### Vertical text

On an element with a vertical `writing-mode`, such as `writing-mode: vertical-rl`, the inline direction runs top to bottom. So logical properties on that element map to different physical sides: `inline-size` sets its height, not its width. If you convert physical properties on these elements, check that they still look right, or keep the physical properties with a `stylelint-disable` comment.

#### Turning it off

To keep using physical properties, turn off the rules in your config:

```js
rules: {
  "property-layout-mappings": null,
  "unit-layout-mappings": null,
  "value-keyword-layout-mappings": null,
}
```

### Extends

- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard): The standard shareable config for Stylelint.
- [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss): The standard shareable SCSS config for Stylelint. _`.scss` files only._

### Plugins

- [stylelint-declaration-block-no-ignored-properties](https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties): Disallow property values that are ignored due to another property value in the same rule.
- [stylelint-high-performance-animation](https://github.com/kristerkari/stylelint-high-performance-animation): Prevent the use of low performance animation and transition properties.
- [stylelint-order](https://github.com/hudochenkov/stylelint-order): Enforce the order of content within declaration blocks.

### Configured Lints

This is a list of the lints turned on in this configuration (beyond the ones that come from `stylelint-config-standard` and `stylelint-config-standard-scss`), and what they do.

- [`at-rule-empty-line-before`](https://stylelint.io/user-guide/rules/at-rule-empty-line-before/): Require an empty line before at-rules. _disabled, because it requires an empty line before blockless at-rules like `@include`, which looks awkward among declarations ([#7](https://github.com/cloudfour/stylelint-config-cloudfour/issues/7)). The option that would allow this [won't be added](https://github.com/stylelint/stylelint/issues/2480), since Stylelint no longer adds features to formatting rules._
- [`comment-empty-line-before`](https://stylelint.io/user-guide/rules/comment-empty-line-before/): Require an empty line before comments. _overriding the standard rule to exclude the first nested comment in a block._
- [`import-notation`](https://stylelint.io/user-guide/rules/import-notation/): Require `@import` paths to be strings, such as `@import 'foo.css'`, rather than `url()`. _overriding the standard rule to match the Sass convention._
- [`no-descending-specificity`](https://stylelint.io/user-guide/rules/no-descending-specificity/): Disallow selectors of lower specificity from coming after overriding selectors of higher specificity. _disabled due to false positives in SCSS contexts._
- [`rule-empty-line-before`](https://stylelint.io/user-guide/rules/rule-empty-line-before/): Require an empty line before multi-line rules. _overriding the standard rule to exclude the first multi-line rule in a block, and to ignore rules following comments._

#### Logical properties

- [`property-layout-mappings`](https://stylelint.io/user-guide/rules/property-layout-mappings/): Require logical properties, such as `margin-inline-start` instead of `margin-left`. _ignoring `overflow-x` and `overflow-y`._
- [`unit-layout-mappings`](https://stylelint.io/user-guide/rules/unit-layout-mappings/): Require logical units, such as `vi` instead of `vw`.
- [`value-keyword-layout-mappings`](https://stylelint.io/user-guide/rules/value-keyword-layout-mappings/): Require logical keywords, such as `float: inline-start` instead of `float: left`. _ignoring `offset-anchor` and `offset-position`._

#### Order

- [`order/order`](https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md): Specifies the order of content within declaration blocks: Sass variables, custom properties, declarations, nested rules. `@include` can go anywhere, since its position decides which styles win.
- [`order/properties-alphabetical-order`](https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-alphabetical-order/README.md): Specify the alphabetical order of properties within declaration blocks.

#### SCSS

These only apply to `.scss` files. The Sass formatting rules from `stylelint-config-standard-scss`, such as `scss/operator-no-newline-after`, are turned off, since [Prettier](#using-with-prettier) handles formatting.

- [`at-rule-disallowed-list`](https://stylelint.io/user-guide/rules/at-rule-disallowed-list/): Disallow use of `@extend` because it's [considered an anti-pattern](https://csswizardry.com/2016/02/mixins-better-for-performance/), and `@import` because it's [deprecated](https://sass-lang.com/documentation/at-rules/import)
- [`scss/declaration-nested-properties`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-nested-properties/README.md): Disallow SCSS nested property groups, such as `font { size: 16px; weight: 700; }`.
- [`scss/selector-no-redundant-nesting-selector`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-redundant-nesting-selector/README.md): Disallow redundant nesting selectors (`&`).

#### Performance

- [`plugin/declaration-block-no-ignored-properties`](https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties): Disallow property values that are ignored due to another property value in the same rule, such as `width` with `display: inline`.
- [`plugin/no-low-performance-animation-properties`](https://github.com/kristerkari/stylelint-high-performance-animation): Prevent the use of low performance animation and transition properties that trigger `layout`.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
