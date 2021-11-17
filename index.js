'use strict';

module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-suitcss'],
	rules: {
		// redeclared from stylelint-config-standard-scss
		// because suitcss sets to `always`
		'block-closing-brace-newline-after': [
			'always',
			{
				ignoreAtRules: ['if', 'else'],
			},
		],
		// our rules from here on
		'at-rule-disallowed-list': ['extend'],
		'at-rule-empty-line-before': null,
		'comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
			},
		],
		// this is being set in stylelint-standard, but we don't want it
		'declaration-empty-line-before': null,
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
		'scss/declaration-nested-properties': 'never',
		'scss/selector-no-redundant-nesting-selector': true,
	},
};
