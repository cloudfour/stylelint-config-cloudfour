import cloudfour from './index.js';

// Applied to `.scss` files by the main config. Also exported on its own as
// `stylelint-config-cloudfour/scss`, for projects that need Sass rules on
// other file types, so it repeats the shared rules: standard-scss would
// otherwise reset them when extended after the main config.
export default {
	extends: ['stylelint-config-standard-scss'],
	plugins: cloudfour.plugins,
	rules: {
		...cloudfour.rules,
		// these are being set in stylelint-standard-scss, but we don't want them
		'scss/at-function-pattern': null,
		'scss/at-mixin-pattern': null,
		'scss/dollar-variable-pattern': null,
		'scss/percent-placeholder-pattern': null,
		// formatting rules that Prettier handles, and in places contradicts
		'scss/at-else-closing-brace-newline-after': null,
		'scss/at-else-closing-brace-space-after': null,
		'scss/at-else-empty-line-before': null,
		'scss/at-else-if-parentheses-space-before': null,
		'scss/at-function-parentheses-space-before': null,
		'scss/at-if-closing-brace-newline-after': null,
		'scss/at-if-closing-brace-space-after': null,
		'scss/at-mixin-parentheses-space-before': null,
		'scss/dollar-variable-colon-space-after': null,
		'scss/dollar-variable-colon-space-before': null,
		'scss/operator-no-newline-after': null,
		'scss/operator-no-newline-before': null,
		'scss/operator-no-unspaced': null,
		// our rules from here on
		'at-rule-disallowed-list': [
			['extend', 'import'],
			{
				severity: 'error',
				message: 'Prefer @use and @forward rather than @import.',
			},
		],
		'scss/declaration-nested-properties': 'never',
		'scss/selector-no-redundant-nesting-selector': true,
	},
};
