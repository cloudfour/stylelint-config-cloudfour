export default {
	extends: ['stylelint-config-standard'],
	plugins: [
		'stylelint-declaration-block-no-ignored-properties',
		'stylelint-high-performance-animation',
		'stylelint-order',
	],
	rules: {
		// these are being set in stylelint-standard, but we don't want them
		'alpha-value-notation': null, // not ready for this syntax yet
		'container-name-pattern': null,
		'custom-media-pattern': null,
		'custom-property-pattern': null,
		'declaration-block-no-redundant-longhand-properties': null, // #407
		'declaration-empty-line-before': null, // false errors after SCSS comments
		'keyframes-name-pattern': null,
		'layer-name-pattern': null,
		'selector-class-pattern': null,
		'selector-id-pattern': null,
		// our rules from here on
		'at-rule-empty-line-before': null,
		'comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
			},
		],
		'import-notation': 'string',
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
		'order/properties-alphabetical-order': true,
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
		'plugin/declaration-block-no-ignored-properties': true,
		'plugin/no-low-performance-animation-properties': [true, { ignore: 'paint-properties' }],
	},
	overrides: [
		{
			// Sass rules and the SCSS parser only apply to Sass files, so plain CSS
			// is parsed as CSS and keeps the validity rules that standard-scss turns
			// off (#638). Globs without a slash match the basename at any depth.
			files: ['*.scss', '**/*.scss'],
			extends: ['./scss.js'],
		},
	],
};
