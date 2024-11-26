import type { Users } from '$src/domain/Users';

export interface IUsersRepository {
	create(users: Users): Promise<Users>;
	findUsername(username: string): Promise<Users | null>;
	findId(id: number): Promise<Users | null>;
	update(users: Users): Promise<Users>;
	delete(id: number): Promise<void>;
}
