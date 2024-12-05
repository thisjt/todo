import { expect, it, describe } from 'vitest';

import {
	AlreadyExists,
	ApplicationError,
	AuthenticationError,
	DomainError,
	NotFound
} from '$src/domain/Errors';

describe('errors domain entity', () => {
	const context = { test: 'value' };
	const identifier = 5;
	const entity = 'sampleEntity';
	const domainErrorCode = 1000;
	const applicationErrorCode = 2000;

	describe('domain errors', () => {
		it('should contain base domain error', () => {
			const error = new DomainError('Base Error');
			expect(error.message).toBe('Base Error');
			expect(error.name).toBe('DomainError');
		});

		it('should have error code of domain error', () => {
			const error = new DomainError('Base Error');
			expect(error.code).toBeGreaterThanOrEqual(domainErrorCode);
			expect(error.code).toBeLessThan(domainErrorCode + 1000);
		});

		it('should store context if available', () => {
			const context = { test: 'value' };
			const error = new DomainError('Base Error', context);
			expect(error.context).toEqual(context);
		});
	});

	describe('application errors', () => {
		it('should contain base application error', () => {
			const error = new ApplicationError('Base Error');
			expect(error.message).toBe('Base Error');
			expect(error.name).toBe('ApplicationError');
		});

		it('should have error code of application error', () => {
			const error = new ApplicationError('Base Error');
			expect(error.code).toBeGreaterThanOrEqual(applicationErrorCode);
			expect(error.code).toBeLessThan(applicationErrorCode + 1000);
		});

		it('should store context if available', () => {
			const error = new ApplicationError('Base Error', context);
			expect(error.context).toEqual(context);
			expect(error.code).toBeGreaterThanOrEqual(applicationErrorCode);
			expect(error.code).toBeLessThan(applicationErrorCode + 1000);
		});

		it('should be able to deliver AuthenticationError', () => {
			const error = new AuthenticationError(identifier, context);
			expect(error.context).toEqual({ identifier, ...context });
			expect(error.name).toBe('AuthenticationError');
			expect(error.code).toBeGreaterThanOrEqual(applicationErrorCode);
			expect(error.code).toBeLessThan(applicationErrorCode + 1000);
		});

		it('should be able to deliver AlreadyExists', () => {
			const error = new AlreadyExists(entity, identifier, context);
			expect(error.context).toEqual({ entity, identifier, ...context });
			expect(error.name).toBe('AlreadyExists');
			expect(error.code).toBeGreaterThanOrEqual(applicationErrorCode);
			expect(error.code).toBeLessThan(applicationErrorCode + 1000);
		});

		it('should be able to deliver NotFound', () => {
			const error = new NotFound(entity, identifier, context);
			expect(error.context).toEqual({ entity, identifier, ...context });
			expect(error.name).toBe('NotFound');
			expect(error.code).toBeGreaterThanOrEqual(applicationErrorCode);
			expect(error.code).toBeLessThan(applicationErrorCode + 1000);
		});
	});
});
