'use strict';

const config = require('../..');
const fs = require('fs');
const stylelint = require('stylelint');

const validCss = fs.readFileSync('./__tests__/use-logical-spec/valid.css', 'utf-8');
const invalidCss = fs.readFileSync('./__tests__/use-logical-spec/invalid.css', 'utf-8');

describe('flags no warnings with valid css', () => {
	let result;

	beforeEach(() => {
		result = stylelint.lint({
			code: validCss,
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

describe('flags warnings with invalid css', () => {
	let result;

	beforeEach(() => {
		result = stylelint.lint({
			code: invalidCss,
			config,
		});
	});

	it('did error', () => {
		return result.then((data) => expect(data.errored).toBeTruthy());
	});

	it('flags many warning', () => {
		return result.then((data) => expect(data.results[0].warnings).toHaveLength(26));
	});

	it('sample correct rule flagged', () => {
		return result.then((data) =>
			expect(data.results[0].warnings[0].rule).toBe('liberty/use-logical-spec'),
		);
	});
});
