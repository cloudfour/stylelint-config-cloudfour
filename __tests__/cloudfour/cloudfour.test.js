'use strict';

const config = require('../../');
const fs = require('fs');
const stylelint = require('stylelint');

const validScss = fs.readFileSync('./__tests__/cloudfour/valid.scss', 'utf-8');
const invalidScss = fs.readFileSync('./__tests__/cloudfour/invalid.scss', 'utf-8');

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

	it('flags five warnings', () => {
		return result.then((data) => expect(data.results[0].warnings).toHaveLength(4));
	});

	it('correct rule flagged', () => {
		return result.then((data) => {
			expect(data.results[0].warnings[0].rule).toBe('scss/selector-no-redundant-nesting-selector');
			expect(data.results[0].warnings[1].rule).toBe('at-rule-disallowed-list');
			expect(data.results[0].warnings[2].rule).toBe('at-rule-disallowed-list');
			expect(data.results[0].warnings[3].rule).toBe('property-no-unknown');
		});
	});
});
