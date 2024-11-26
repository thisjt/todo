import type { Session } from '$src/domain/Session';
import type { Users } from '$src/domain/Users';

export interface IAuthenticationService {
	createToken(session: Session): Promise<string>;
	validateSession(token: string): Promise<Session | null>;
	validatePassword(users: Users, hashedPassword: string): boolean;
	validateSignupToken(token: string): boolean;
	hashPassword(password: string, salt: string): string;
	generateSalt(): string;
	generateRandom(length: number): string;
}
