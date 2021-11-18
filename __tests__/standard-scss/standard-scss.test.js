'use strict';

const config = require('../..');
const fs = require('fs');
const stylelint = require('stylelint');

const validScss = fs.readFileSync('./__tests__/standard-scss/valid.scss', 'utf-8');
const invalidScss = fs.readFileSync('./__tests__/standard-scss/invalid.scss', 'utf-8');

describe('flags no warnings with valid scss', () => {
	let result;

	beforeEach(() => {
		result = stylelint.lint({
			code: validScss,
			config,
		});
	});

	it('did not error', () => {
		return result.then((data) => expect(data.errored).toBeFalsy());
	});

	it('flags no warnings', () => {
		return result.then((data) => expect(data.results[0].warnings).toHaveLength(0));
	});
});

describe('flags warnings with invalid scss', () => {
	let result;

	beforeEach(() => {
		result = stylelint.lint({
			code: invalidScss,
			config,
		});
	});

	it('did error', () => {
		return result.then((data) => expect(data.errored).toBeTruthy());
	});

	it('flags one warning', () => {
		return result.then((data) => expect(data.results[0].warnings).toHaveLength(1));
	});

	it('correct warning text', () => {
		return result.then((data) =>
			expect(data.results[0].warnings[0].text).toBe(
				'Unexpected parentheses in argumentless mixin "something" call (scss/at-mixin-argumentless-call-parentheses)',
			),
		);
	});

	it('correct rule flagged', () => {
		return result.then((data) =>
			expect(data.results[0].warnings[0].rule).toBe('scss/at-mixin-argumentless-call-parentheses'),
		);
	});

	it('correct severity flagged', () => {
		return result.then((data) => expect(data.results[0].warnings[0].severity).toBe('error'));
	});

	it('correct line number', () => {
		return result.then((data) => expect(data.results[0].warnings[0].line).toBe(2));
	});

	it('correct column number', () => {
		return result.then((data) => expect(data.results[0].warnings[0].column).toBe(3));
	});
});
