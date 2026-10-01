// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../../index.js';

const validCss = readFileSync('./__tests__/suitcss/valid.css', 'utf-8');
const invalidCss = readFileSync('./__tests__/suitcss/invalid.css', 'utf-8');

describe('stylelint-config-suitcss', () => {
	describe('flags no warnings with valid css', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: validCss,
				config,
			});
		});

		it('has no errors', () => {
			assert.equal(result.errored, false);
		});

		it('flags no warnings', () => {
			assert.equal(result.results[0].warnings.length, 0);
		});

		// Useful for logging when unexpected warning text is flagged.
		it('no warning text', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.text),
				[],
			);
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
				config,
			});
		});

		it('includes an error', () => {
			assert.equal(result.errored, true);
		});

		it('flags one warning', () => {
			assert.equal(result.results[0].warnings.length, 1);
		});

		it('corrects warning text', () => {
			assert.equal(
				result.results[0].warnings[0].text,
				'Expected "#ff0000" to be "#f00" (color-hex-length)',
			);
		});

		it('corrects rule flagged', () => {
			assert.equal(result.results[0].warnings[0].rule, 'color-hex-length');
		});

		it('corrects severity flagged', () => {
			assert.equal(result.results[0].warnings[0].severity, 'error');
		});

		it('corrects line number', () => {
			assert.equal(result.results[0].warnings[0].line, 2);
		});

		it('corrects column number', () => {
			assert.equal(result.results[0].warnings[0].column, 10);
		});
	});
});

// describe('flags warnings with invalid css', () => {
// 	it('correct warning text', () => {
// 		return result.then((data) =>
// 			expect(data.results[0].warnings[0].text).toBe(
// 				'Expected "#ff0000" to be "#f00" (color-hex-length)',
// 			),
// 		);
// 	});

// 	it('correct rule flagged', () => {
// 		return result.then((data) => expect(data.results[0].warnings[0].rule).toBe('color-hex-length'));
// 	});
// });
