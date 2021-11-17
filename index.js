'use strict';

module.exports = {
	extends: 'stylelint-config-suitcss',
	plugins: ['stylelint-use-logical-spec'],
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
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'liberty/use-logical-spec': [
			'always',
			{
				// excluding these props until they're better supported
				// @see https://github.com/cloudfour/cloudfour.com-patterns/issues/1576#issuecomment-969312914
				except: ['float', 'clear', /^border-.*?radius/i],
			},
		],
	},
};
