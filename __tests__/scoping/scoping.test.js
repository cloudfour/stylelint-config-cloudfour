// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

// Extend by package name, the way consumers do, so the `./scss` export and
// override path resolution are tested too.
const config = { extends: ['stylelint-config-cloudfour'] };

const sampleCss = readFileSync('./__tests__/scoping/sample.css', 'utf-8');
const sampleScss = readFileSync('./__tests__/scoping/sample.scss', 'utf-8');

describe('sass scoping', () => {
	describe('css files', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: sampleCss,
				codeFilename: 'input.css',
				config,
			});
		});

		it('does not use the scss parser', async () => {
			const resolved = await stylelint.resolveConfig('input.css', { config });

			assert.equal(resolved.customSyntax, undefined);
		});

		it('flags no scss rules', () => {
			assert.deepEqual(
				result.results[0].warnings.filter((w) => w.rule.startsWith('scss/')),
				[],
			);
		});

		// @import is valid CSS, so the Sass @import ban doesn't apply.
		it('allows @import', () => {
			assert.ok(!result.results[0].warnings.some((w) => w.rule === 'at-rule-disallowed-list'));
		});

		// These core rules are disabled by standard-scss, but apply to CSS.
		it('flags css validity rules', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.rule),
				['declaration-property-value-no-unknown', 'no-duplicate-selectors'],
			);
		});
	});

	describe('scss files', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: sampleScss,
				codeFilename: 'input.scss',
				config,
			});
		});

		it('uses the scss parser', async () => {
			const resolved = await stylelint.resolveConfig('input.scss', { config });

			assert.ok(resolved.customSyntax);
		});

		// Formatting rules like scss/operator-no-newline-after are left to Prettier.
		it('flags only the scss rules we expect', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.rule),
				['scss/selector-no-redundant-nesting-selector'],
			);
		});
	});

	describe('scss config applied to other file types', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: sampleScss,
				codeFilename: 'input.vue',
				config: {
					...config,
					overrides: [{ files: ['*.vue'], extends: ['stylelint-config-cloudfour/scss'] }],
				},
			});
		});

		// The shared rules (e.g. no class name pattern) must survive being
		// extended after the main config.
		it('keeps the shared rules', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.rule),
				['scss/selector-no-redundant-nesting-selector'],
			);
		});
	});
});
