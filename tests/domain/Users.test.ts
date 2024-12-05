import { expect, describe, it } from 'vitest';

import { Users } from '$src/domain/Users';

describe('domain/entity/Users', () => {
	const mockUserData = {
		id: 10,
		username: 'bob',
		password: 'hashedPassword',
		salt: 'uniqueSalt',
		name: 'Bob the Builder'
	};

	describe('constructor', () => {
		const user = new Users(mockUserData);

		it('should create a user entity with all the properties', () => {
			expect(user.id).toBe(mockUserData.id);
			expect(user.username).toBe(mockUserData.username);
			expect(user.name).toBe(mockUserData.name);
		});
	});

	describe('functions', () => {
		const user = new Users(mockUserData);

		it('should compare correct and incorrect password', () => {
			expect(user.comparePassword('hashedPassword')).toBe(true);
			expect(user.comparePassword('incorrectPassword')).toBe(false);
		});

		it('should return salt', () => {
			expect(user.getSalt()).toBe('uniqueSalt');
		});

		it('should return publicly accessible data', () => {
			expect(user.getData()).toBe({
				...mockUserData,
				...{
					password: undefined,
					salt: undefined
				}
			});
		});

		it('should return all data, including private ones', () => {
			expect(user.unsafeGetData()).toBe(mockUserData);
		});
	});
});
