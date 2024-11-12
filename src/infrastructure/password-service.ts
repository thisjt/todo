import type { IPasswordService } from '../interface/password-service';
import { hashPassword, comparePassword } from '../lib/utils/password';

export class PasswordService implements IPasswordService {
	hash(password: string, salt: string): { hashedPassword: string; salt: string } {
		return hashPassword(password, salt);
	}

	compare(password: string, salt: string, hashedPassword: string): boolean {
		return comparePassword(password, salt, hashedPassword);
	}
}
