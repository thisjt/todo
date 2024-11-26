import type { OAHonoContext } from '$lib/types';
import { Session } from '$src/domain/Session';
import type { Users } from '$src/domain/Users';
import type { IAuthenticationService } from '$src/application/services/AuthenticationService';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export class AuthenticationService implements IAuthenticationService {
	constructor(private _context: OAHonoContext) {}

	createToken(session: Session): string {
		return jwt.sign(session.getData(), this._context.env.JWT_SECRET);
	}

	validateSession(token: string): Session | null {
		const verified = jwt.verify(token, this._context.env.JWT_SECRET) as ReturnType<
			typeof Session.prototype.getData
		>;

		if (!verified) return null;

		return new Session(verified, verified.seed);
	}

	validatePassword(users: Users, hashedPassword: string): boolean {
		return users.comparePassword(hashedPassword);
	}

	hashPassword(password: string, salt: string): string {
		return crypto
			.createHmac('sha256', this._context.env.PW_SECRET)
			.update(password + salt)
			.update(salt)
			.digest('hex');
	}

	generateSalt(): string {
		return crypto.randomBytes(16).toString('hex');
	}

	generateRandom(len: number): string {
		return crypto.randomBytes(len).toString('hex');
	}
}
