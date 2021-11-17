'use strict';

module.exports = {
	extends: 'stylelint-config-suitcss',
	plugins: ['stylelint-high-performance-animation'],
	rules: {
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
		'plugin/no-low-performance-animation-properties': true,
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
	},
};
