'use strict';

module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-suitcss'],
	plugins: ['stylelint-high-performance-animation'],
	rules: {
		// redeclared from standard-scss because suitcss sets to `always`
		'block-closing-brace-newline-after': [
			'always',
			{
				ignoreAtRules: ['if', 'else'],
			},
		],
		// these are being set in stylelint-standard, but we don't want them
		'alpha-value-notation': null, // not ready for this syntax yet
		'custom-media-pattern': null,
		'custom-property-pattern': null,
		'declaration-empty-line-before': null, // false errors after SCSS comments
		'keyframes-name-pattern': null,
		'scss/at-function-pattern': null,
		'scss/at-mixin-pattern': null,
		'scss/dollar-variable-pattern': null,
		'scss/percent-placeholder-pattern': null,
		'selector-class-pattern': null,
		'selector-id-pattern': null,
		// our rules from here on
		'at-rule-disallowed-list': [
			['extend', 'import'],
			{
				severity: 'error',
				message: 'Prefer @use and @forward rather than @import.',
			},
		],
		'at-rule-empty-line-before': null,
		'comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
			},
		],
		'max-line-length': [
			80,
			{
				ignore: 'non-comments',
				ignorePattern: '/https?://[0-9,a-z]*.*/',
			},
		],
		'no-descending-specificity': null,
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'selector-not-notation': 'simple', // @see https://github.com/cloudfour/cloudfour.com-patterns/pull/1992#issuecomment-1201454396
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true,
			},
		],
		// rules from plugins
		'order/order': [
			[
				'dollar-variables',
				'custom-properties',
				{
					type: 'at-rule',
					name: 'include',
					hasBlock: false,
				},
				'declarations',
				{
					type: 'at-rule',
					name: 'include',
					hasBlock: true,
				},
				'rules',
			],
		],
		'plugin/no-low-performance-animation-properties': [true, { ignore: 'paint-properties' }],
		'scss/declaration-nested-properties': 'never',
		'scss/selector-no-redundant-nesting-selector': true,
	},
};
