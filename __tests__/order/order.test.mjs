import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import stylelint from 'stylelint';

import config from '../../index.js';

const validScss = readFileSync('./__tests__/order/valid.scss', 'utf-8');
const invalidScss = readFileSync('./__tests__/order/invalid.scss', 'utf-8');

describe('stylelint-order', () => {
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
					'Expected $-variable to come before declaration (order/order)',
					'Expected blockless @include to come before rule (order/order)',
					'Expected an empty line before $-variable (scss/dollar-variable-empty-line-before)',
					'Expected color to come before text-decoration (order/properties-alphabetical-order)',
				],
			);
		});

		it('correct rule flagged', () => {
			assert.deepEqual(
				result.results[0].warnings.map((w) => w.rule),
				[
					'order/order',
					'order/order',
					'scss/dollar-variable-empty-line-before',
					'order/properties-alphabetical-order',
				],
			);
		});

		it('corrects severity flagged', () => {
			assert.equal(result.results[0].warnings[0].severity, 'error');
		});

		it('corrects line number', () => {
			assert.equal(result.results[0].warnings[0].line, 4);
		});

		it('corrects column number', () => {
			assert.equal(result.results[0].warnings[0].column, 3);
		});
	});
});
