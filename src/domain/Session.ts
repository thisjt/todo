import type { Users } from './Users';

export class Session {
	public id: number;
	public username: string;
	public name: string;

	constructor(session: ReturnType<Users['getData']>) {
		this.id = session.id;
		this.username = session.username;
		this.name = session.name;
	}
}
