export class Users {
	public id: number;
	public username: string;
	public name: string;

	private password: string;
	private salt: string;

	constructor(user: ReturnType<Users['unsafeGetData']>) {
		this.id = user.id;
		this.username = user.username;
		this.password = user.password;
		this.salt = user.salt;
		this.name = user.name;
	}

	getSalt(): string {
		return this.salt;
	}

	unsafeGetData() {
		return {
			id: this.id,
			username: this.username,
			password: this.password,
			salt: this.salt,
			name: this.name
		};
	}

	getData() {
		return {
			id: this.id,
			username: this.username,
			name: this.name
		};
	}
}
