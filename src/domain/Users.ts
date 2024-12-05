interface UsersObject {
	id: number;
	username: string;
	name: string;
	password: string;
	salt: string;
}

export class Users {
	public id: number;
	public username: string;
	public name: string;

	private password: string;
	private salt: string;

	constructor(user: UsersObject) {
		this.id = user.id;
		this.username = user.username;
		this.password = user.password;
		this.salt = user.salt;
		this.name = user.name;
	}

	comparePassword(hashedPassword: string): boolean {
		return hashedPassword === this.password;
	}

	unsafeGetData(): UsersObject {
		return {
			id: this.id,
			username: this.username,
			password: this.password,
			salt: this.salt,
			name: this.name
		};
	}

	getSalt(): string {
		return this.salt;
	}

	getData(): Omit<UsersObject, 'password' | 'salt'> {
		return {
			id: this.id,
			username: this.username,
			name: this.name
		};
	}
}
