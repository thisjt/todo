import type {
	UserCreateInput,
	UserDeleteInput,
	UserEntity,
	UserUpdateInput
} from '../entities/user';

export interface IUserRepository {
	create(input: UserCreateInput): Promise<UserEntity>;
	findById(id: number): Promise<UserEntity | null>;
	findByUsername(username: string): Promise<UserEntity | null>;
	update(id: number, input: UserUpdateInput): Promise<UserEntity>;
	delete(input: UserDeleteInput): Promise<UserEntity>;
}
