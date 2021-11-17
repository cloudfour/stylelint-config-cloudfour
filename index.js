'use strict';

module.exports = {
	extends: ['stylelint-config-suitcss', 'stylelint-config-standard-scss'],
	rules: {
		'at-rule-empty-line-before': null,
		'comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
			},
		],
		'declaration-empty-line-before': 'never',
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
