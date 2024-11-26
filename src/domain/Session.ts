import type { Users } from './Users';

export class Session {
	public id: number;
	public username: string;
	public name: string;
	public seed: string;

	constructor(session: ReturnType<Users['getData']>, seed: string) {
		this.id = session.id;
		this.username = session.username;
		this.name = session.name;
		this.seed = seed;
	}

	getData() {
		return {
			id: this.id,
			username: this.username,
			name: this.name,
			seed: this.seed
		};
	}
}
