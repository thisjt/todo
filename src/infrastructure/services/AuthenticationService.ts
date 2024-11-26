import type { OAHonoContext } from '$lib/types';
import { Session } from '$src/domain/Session';
import type { Users } from '$src/domain/Users';
import type { IAuthenticationService } from '$src/application/services/AuthenticationService';

import * as jwt from 'hono/jwt';
import crypto from 'crypto';

export class AuthenticationService implements IAuthenticationService {
	constructor(private _context: OAHonoContext) {}

	async createToken(session: Session) {
		return jwt.sign(session.getData(), this._context.env.JWT_SECRET);
	}

	async validateSession(token: string) {
		const verified = (await jwt.verify(token, this._context.env.JWT_SECRET)) as ReturnType<
			typeof Session.prototype.getData
		>;

		if (!verified) return null;

		return new Session(verified, verified.seed);
	}

	validatePassword(users: Users, hashedPassword: string) {
		return users.comparePassword(hashedPassword);
	}

	hashPassword(password: string, salt: string) {
		return crypto
			.createHmac('sha256', this._context.env.PW_SECRET)
			.update(password + salt)
			.update(salt)
			.digest('hex');
	}

	generateSalt() {
		return crypto.randomBytes(16).toString('hex');
	}

	generateRandom(len: number) {
		return crypto.randomBytes(len).toString('hex');
	}
}
