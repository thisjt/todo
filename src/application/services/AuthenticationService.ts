import type { Session } from '$src/domain/entities/Session';
import type { Users } from '$src/domain/entities/Users';

export interface IAuthenticationService {
	createToken(session: Session): string;
	validateSession(token: string): Session | null;
	validatePassword(users: Users, password: string): boolean;
	hashPassword(password: string, salt: string): string;
}
