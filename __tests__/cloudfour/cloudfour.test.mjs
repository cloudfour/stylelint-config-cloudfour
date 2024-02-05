import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../../index.js';

const validScss = readFileSync('./__tests__/cloudfour/valid.scss', 'utf-8');
const invalidScss = readFileSync('./__tests__/cloudfour/invalid.scss', 'utf-8');

describe('cloudfour test', () => {
	describe('flags no warnings with valid css', () => {
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

	describe('flags warnings with invalid css', () => {
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

		it('flags warnings', () => {
			assert.equal(result.results[0].warnings.length, 4);
		});

		it('correct warning text', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.text),
				[
					'Unnecessary nesting selector (&) (scss/selector-no-redundant-nesting-selector)',
					'Prefer @use and @forward rather than @import.',
					'Prefer @use and @forward rather than @import.',
					'Unexpected unknown property "weight" (property-no-unknown)',
				],
			);
		});

		it('correct rule flagged', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.rule),
				[
					'scss/selector-no-redundant-nesting-selector',
					'at-rule-disallowed-list',
					'at-rule-disallowed-list',
					'property-no-unknown',
				],
			);
		});

		it('corrects severity flagged', () => {
			assert.equal(result.results[0].warnings[0].severity, 'error');
		});

		it('corrects line number', () => {
			assert.equal(result.results[0].warnings[0].line, 10);
		});

		it('corrects column number', () => {
			assert.equal(result.results[0].warnings[0].column, 3);
		});
	});
});
