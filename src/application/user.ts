import type { UserCreateInput, UserDeleteWhere, UserRead, UserUpdateInput } from '../entities/user';
import { hashPassword } from '../lib/utils/password';
import type { IUserRepository } from '../interface/user-repository';

export class UserApplication {
	constructor(private userRepository: IUserRepository) {}

	async create(input: UserCreateInput): Promise<UserRead> {
		const hashedPassword = hashPassword(input.password);
		return this.userRepository.create({
			...input,
			password: hashedPassword.hashedPassword,
			salt: hashedPassword.salt
		});
	}

	async findById(id: number): Promise<UserRead | null> {
		return this.userRepository.findById(id);
	}

	async findByUsername(username: string): Promise<UserRead | null> {
		return this.userRepository.findByUsername(username);
	}

	async update(id: number, input: UserUpdateInput): Promise<UserRead> {
		return this.userRepository.update(id, input);
	}

	async delete(input: UserDeleteWhere): Promise<UserRead> {
		return this.userRepository.delete(input);
	}
}
