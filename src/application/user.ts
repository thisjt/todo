import type {
	UserCreateInput,
	UserDeleteInput,
	UserEntity,
	UserUpdateInput
} from '../entities/user';
import { hashPassword } from '../lib/utils/password';
import type { IUserRepository } from '../interface/user-repository';

export class UserApplication {
	constructor(private userRepository: IUserRepository) {}

	async create(input: UserCreateInput): Promise<UserEntity> {
		const hashedPassword = hashPassword(input.password);
		return this.userRepository.create({
			...input,
			password: hashedPassword.hashedPassword,
			salt: hashedPassword.salt
		});
	}

	async findById(id: number): Promise<UserEntity | null> {
		return this.userRepository.findById(id);
	}

	async findByUsername(username: string): Promise<UserEntity | null> {
		return this.userRepository.findByUsername(username);
	}

	async update(id: number, input: UserUpdateInput): Promise<UserEntity> {
		return this.userRepository.update(id, input);
	}

	async delete(input: UserDeleteInput): Promise<UserEntity> {
		return this.userRepository.delete(input);
	}
}
