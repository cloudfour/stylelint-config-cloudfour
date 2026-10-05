# 12.0.0 - Unreleased

- Sass rules and the SCSS parser now only apply to `.scss` files (#638)
  - `.css` files are now parsed as CSS, and get core rules that `stylelint-config-standard-scss` turns off, such as `declaration-property-value-no-unknown`, `at-rule-prelude-no-invalid`, `media-query-no-invalid`, and `no-duplicate-selectors`
  - `at-rule-disallowed-list` (`@extend` and `@import`) now only applies to `.scss` files
  - Added a `stylelint-config-cloudfour/scss` entry point, for applying the Sass rules to other file types, such as Vue components with `<style lang="scss">`
  - Migrating CSS projects: remove any `scss/*` or `at-rule-disallowed-list` overrides, and move `ignoreAtRules` options from `scss/at-rule-no-unknown` to `at-rule-no-unknown`
  - Migrating Vue projects that use `<style lang="scss">`: Sass blocks now get the CSS rules by default, which report Sass at-rules like `@use` as unknown. Apply `stylelint-config-cloudfour/scss` to `.vue` files, as described in the README
  - Migrating PostCSS plugin projects: custom syntax like `svg-load()` or `@define-mixin` may now be flagged by `declaration-property-value-no-unknown` or `at-rule-prelude-no-invalid`, and need ignore options
- Disabled the `stylelint-scss` formatting rules that conflict with Prettier, such as `scss/operator-no-newline-after` (#638)
- Added `stylelint-config-standard` as a direct dependency

# 11.0.0 - 2026-10-01

- Removed `stylelint-config-suitcss`, which is no longer maintained and was blocking the upgrade to Stylelint v17 (#636)
  - Alphabetical property order is still enforced, now via `stylelint-order` directly
  - Removed the `suitcss/root-no-standard-properties` and `suitcss/selector-root-no-composition` rules
  - `length-zero-no-unit` and `value-no-vendor-prefix` now use the `stylelint-config-standard` options, which ignore custom properties and allow `-webkit-box` / `-webkit-inline-box` respectively
- Added `stylelint-declaration-block-no-ignored-properties`
- Disabled `container-name-pattern` and `layer-name-pattern`, new in `stylelint-config-standard-scss` v17, to match our other naming pattern rules
- Updated `stylelint` peer dependency to v17
- Updated `stylelint-config-standard-scss` to v17
- Updated `stylelint-high-performance-animation` to v2
- Updated minimum Node version to 20.19.0
- Converted to ESM

# 10.0.0 - 2024-02-06

- Updated `stylelint-config-suitcss` to v21
- Updated `stylelint-config-standard-scss` to v13
- Updated `stylelint` peer dependency to v16
- Disabled `declaration-block-no-redundant-longhand-properties` (#407)
- Disabled `suitcss/custom-property-no-outside-root` (#318)

# 9.0.0 - 2023-09-19

- Updated `stylelint-config-standard-scss` to v11
- Updated `stylelint-config-suitcss` to v20
  - This doesn't require a version change on our part, they're just fixing
    their stylelint peer dependency to v15, but we already had that.

# 8.0.0 - 2023-07-24

- Updated `stylelint` peer dependency to v15
- Updated `stylelint-config-standard-scss` to v10
- Updated `stylelint-config-suitcss` to v19

# 7.0.0 - 2022-12-13

- Major version bump due to dependencies
- Updated `stylelint-config-standard-scss` to v6

# 6.1.0 - 2022-08-22

- Change `selector-not-notation` to "simple".

# 6.0.0 - 2022-07-25

- Updated `stylelint-config-standard-scss` to v5
- Removed: `stylelint` less than `14.9.0` from peer dependencies.

# 5.1.0 - 2022-02-16

- Added `camelCaseSvgKeywords` rule to `value-case-keyword`, to allow continued use of `currentColor`.

# 5.0.2 - 2021-11-18

- Removed: `no-descending-specificity` rule, due to false positives (#216)

# 5.0.1 - 2021-11-17

- Unset all `pattern` rules that `stylelint-standard` set to kebab.
  This conflicts with SUIT naming rules.

# 5.0.0 - 2021-11-17

- Major version bump due to dependencies
- Updated `stylelint` to v14.0.0
- Add stylelint-config-standard-scss
- Disallow usage of `@extend` and `@import` statements
- Ensure variables and `@include` statements are declared at the top of declaration blocks.
- Added `stylelint-high-performance-animation`

# 4.0.0 - 2021-02-22

- Updated to v15 of `stylelint-config-suitcss`, which updates its peer
  dependency for `stylelint` to v13.

# 3.1.2 - 2020-03-06

- Fix another typo in README. (version bump to deploy to NPM)

# 3.1.1 - 2020-03-06

- Fix typo in README. (version bump to deploy to NPM)

# 3.1.0 - 2020-03-06

- We no longer enforce blank lines before rules after comments.
- We no longer enforce empty lines before at-rules.

# 3.0.0 - 2020-02-07

- Major version bump due dependencies
- Updated `stylelint` to v13
- Updated `jest` to v25
- Updated `eslint` to v6.8.0

# 2.0.0 - 2019-11-19

- Major version bump due to Stylelint v12

# 1.0.6 - 2019-02-15

- Updated readme and fixed typo in `.travis.yml`

# 1.0.5 - 2019-02-14

- Pin Dependencies

# 1.0.4 - 2019-02-14

- Add Renovate

# 1.0.3 - 2019-02-14

- Updated readme

# 1.0.2 - 2019-02-14

- Add TravisCI

# 1.0.1 - 2019-02-14

- Updated readme

# 1.0.0 - 2019-02-12

- Initial release
