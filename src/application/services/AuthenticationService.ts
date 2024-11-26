import type { Session } from '$src/domain/Session';
import type { Users } from '$src/domain/Users';

export interface IAuthenticationService {
	createToken(session: Session): string;
	validateSession(token: string): Session | null;
	validatePassword(users: Users, hashedPassword: string): boolean;
	hashPassword(password: string, salt: string): string;
	generateSalt(): string;
}
