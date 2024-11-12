export interface IPasswordService {
	hash(password: string, salt: string): { hashedPassword: string; salt: string };
	compare(password: string, salt: string, hashedPassword: string): boolean;
}
