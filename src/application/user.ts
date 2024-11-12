import type {
	UserCreateInput,
	UserDeleteWhere,
	UserLoginInput,
	UserRead,
	UserUpdateInput,
	UserWithoutPassword
} from '../entities/user';
import { comparePassword, hashPassword } from '../lib/utils/password';
import type { IUserRepository } from '../interface/user-repository';

export class UserApplication {
	constructor(private userRepository: IUserRepository) {}

	async login(input: UserLoginInput): Promise<UserWithoutPassword | null> {
		const user = await this.findByUsername(input.username);
		if (!user) {
			return null;
		}
		const isPasswordValid = comparePassword(input.password, user.salt, user.password);
		if (!isPasswordValid) {
			return null;
		}
		const userWithoutPassword = user as UserWithoutPassword;
		delete userWithoutPassword.password;
		delete userWithoutPassword.salt;
		return userWithoutPassword;
	}

	async findById(id: number): Promise<UserRead | null> {
		return this.userRepository.findById(id);
	}

	async findByUsername(username: string): Promise<UserRead | null> {
		return this.userRepository.findByUsername(username);
	}

	async create(input: UserCreateInput): Promise<UserRead> {
		const hashedPassword = hashPassword(input.password);
		return this.userRepository.create({
			...input,
			password: hashedPassword.hashedPassword,
			salt: hashedPassword.salt
		});
	}

	async read(username?: string): Promise<UserRead | UserRead[] | null> {
		if (username) {
			return this.userRepository.findByUsername(username);
		} else {
			return this.userRepository.findAll();
		}
	}

	async update(id: number, input: UserUpdateInput): Promise<UserRead> {
		return this.userRepository.update(id, input);
	}

	async delete(input: UserDeleteWhere): Promise<UserRead> {
		return this.userRepository.delete(input);
	}
}
