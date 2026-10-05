export default {
	extends: ['stylelint-config-standard'],
	plugins: [
		'stylelint-declaration-block-no-ignored-properties',
		'stylelint-high-performance-animation',
		'stylelint-order',
	],
	// Lets the logical property rules autofix: a physical side like `left` only
	// maps to a logical side once the writing direction is known. Projects with
	// other writing directions can override this.
	languageOptions: {
		directionality: {
			block: 'top-to-bottom',
			inline: 'left-to-right',
		},
	},
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
		// Prefer logical properties, units, and keywords (#214)
		'property-layout-mappings': [
			'flow-relative',
			{
				// overflow-inline and overflow-block need Safari 26 (#662)
				ignoreProperties: ['overflow-x', 'overflow-y'],
			},
		],
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'selector-not-notation': 'simple', // @see https://github.com/cloudfour/cloudfour.com-patterns/pull/1992#issuecomment-1201454396
		'unit-layout-mappings': 'flow-relative',
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true,
			},
		],
		'value-keyword-layout-mappings': [
			'flow-relative',
			{
				// browsers don't support logical keywords in these yet (#663)
				ignoreProperties: ['offset-anchor', 'offset-position'],
			},
		],
		// rules from plugins
		'order/properties-alphabetical-order': true,
		// @include is left unordered: since Sass 1.92, its position decides which
		// styles win, so reordering it (including with --fix) changes the CSS (#528)
		'order/order': [['dollar-variables', 'custom-properties', 'declarations', 'rules']],
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
