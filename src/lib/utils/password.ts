import crypto from 'crypto';

export const hashPassword = (password: string, salt?: string) => {
	const createdSalt = salt ?? crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, createdSalt, 1000, 64, 'sha512').toString('hex');
	return { hashedPassword: hash, salt: createdSalt };
};

export const comparePassword = (password: string, salt: string, hashedPassword: string) => {
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return hash === hashedPassword;
};
