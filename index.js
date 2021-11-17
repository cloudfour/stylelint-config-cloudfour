'use strict';

module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-suitcss'],
	rules: {
		// redeclared from standard-scss because suitcss sets to `always`
		'block-closing-brace-newline-after': [
			'always',
			{
				ignoreAtRules: ['if', 'else'],
			},
		],
		// this is being set in stylelint-standard, but we don't want it
		'declaration-empty-line-before': null,
		// our rules from here on
		'alpha-value-notation': null, // not ready for this syntax yet
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
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
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
		'scss/declaration-nested-properties': 'never',
		'scss/selector-no-redundant-nesting-selector': true,
	},
};
