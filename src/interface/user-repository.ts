import type { UserCreateInput, UserDeleteWhere, UserRead, UserUpdateInput } from '../entities/user';

export interface IUserRepository {
	create(input: UserCreateInput): Promise<UserRead>;
	findById(id: number): Promise<UserRead | null>;
	findByUsername(username: string): Promise<UserRead | null>;
	findAll(): Promise<UserRead[]>;
	update(id: number, input: UserUpdateInput): Promise<UserRead>;
	delete(input: UserDeleteWhere): Promise<UserRead>;
}
