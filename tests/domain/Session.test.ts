import { expect, describe, it } from 'vitest';

import { Session } from '$src/domain/Session';

describe('session entity domain', () => {
	const sessionMockData = {
		id: 4,
		username: 'bob',
		name: 'bob the builder',
		seed: 'seed'
	};

	describe('constructor', () => {
		const session = new Session(sessionMockData, sessionMockData.seed);

		it('should create a session entity with all the properties', () => {
			expect(session.id).toBe(sessionMockData.id);
			expect(session.username).toBe(sessionMockData.username);
			expect(session.name).toBe(sessionMockData.name);
			expect(session.seed).toBe(sessionMockData.seed);
		});
	});

	describe('functions', () => {
		it('should return all values', () => {
			const session = new Session(sessionMockData, sessionMockData.seed);
			expect(session.getData()).toEqual(sessionMockData);
		});
	});
});
