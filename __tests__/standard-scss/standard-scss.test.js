// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../../index.js';

const validScss = readFileSync('./__tests__/standard-scss/valid.scss', 'utf8');
const invalidScss = readFileSync('./__tests__/standard-scss/invalid.scss', 'utf8');

describe('stylelint-standard-scss', () => {
	describe('flags no warnings with valid scss', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: validScss,
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

	describe('flags warnings with invalid scss', () => {
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: invalidScss,
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
				'Unexpected parentheses in argumentless mixin "something" call (scss/at-mixin-argumentless-call-parentheses)',
			);
		});

		it('corrects rule flagged', () => {
			assert.equal(
				result.results[0].warnings[0].rule,
				'scss/at-mixin-argumentless-call-parentheses',
			);
		});

		it('corrects severity flagged', () => {
			assert.equal(result.results[0].warnings[0].severity, 'error');
		});

		it('corrects line number', () => {
			assert.equal(result.results[0].warnings[0].line, 2);
		});

		it('corrects column number', () => {
			assert.equal(result.results[0].warnings[0].column, 12);
		});
	});
});
