// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../../index.js';

const validCss = readFileSync('./__tests__/logical-properties/valid.css', 'utf-8');
const invalidCss = readFileSync('./__tests__/logical-properties/invalid.css', 'utf-8');

describe('logical properties', () => {
	describe('flags no warnings with valid css', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: validCss,
				codeFilename: 'input.css',
				config,
			});
		});

		it('has no errors', () => {
			assert.equal(result.errored, false);
		});

		// Useful for logging when unexpected rules are flagged.
		it('no rules flagged', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.rule),
				[],
			);
		});
	});

	describe('flags warnings with invalid css', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: invalidCss,
				codeFilename: 'input.css',
				config,
			});
		});

		it('includes an error', () => {
			assert.equal(result.errored, true);
		});

		it('correct warning text', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.text),
				[
					'Expected "margin-left" to be "margin-inline-start" (property-layout-mappings)',
					'Expected "width" to be "inline-size" (property-layout-mappings)',
					'Expected "vw" to be "vi" (unit-layout-mappings)',
					'Expected "left" to be "inline-start" (value-keyword-layout-mappings)',
				],
			);
		});
	});

	// Autofix needs the writing direction, which the config sets. The Sass
	// config is exported on its own, so it needs to set it too.
	const fixCases = [
		['main config', config, 'input.css'],
		['sass config', { extends: ['stylelint-config-cloudfour/scss'] }, 'input.scss'],
	];

	for (const [name, fixConfig, codeFilename] of fixCases) {
		it(`fixes physical properties with the ${name}`, async () => {
			const result = await stylelint.lint({
				code: invalidCss,
				codeFilename,
				config: fixConfig,
				fix: true,
			});

			// Renamed properties are re-sorted on the next --fix run.
			assert.equal(
				result.code,
				'.foo {\n  float: inline-start;\n  margin-inline-start: 1rem;\n  inline-size: 100vi;\n}\n',
			);
		});
	}
});
