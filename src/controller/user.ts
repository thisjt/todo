import type {
	UserCreateInput,
	UserUpdateInput,
	UserDeleteWhere,
	UserLoginInput,
	UserWithoutPassword
} from '../entities/user';
import { UserApplication } from '../application/user';
import { NotFoundError, UnauthorizedError } from '../entities/errors';
import { comparePassword } from '$lib/utils/password';

export class UserController {
	constructor(private userApplication: UserApplication) {}

	async login(input: UserLoginInput) {
		const user = await this.userApplication.findByUsername(input.username);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		const isPasswordValid = comparePassword(input.password, user.salt, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedError('Invalid password');
		}
		const userWithoutPassword = user as UserWithoutPassword;

		delete userWithoutPassword.password;
		delete userWithoutPassword.salt;

		return userWithoutPassword;
	}

	async create(input: UserCreateInput) {
		return this.userApplication.create(input);
	}

	async read(username?: string) {
		if (username) {
			return this.userApplication.read(username);
		} else {
			return this.userApplication.read();
		}
	}

	async update(id: number, input: UserUpdateInput) {
		return this.userApplication.update(id, input);
	}

	async delete(input: UserDeleteWhere) {
		return this.userApplication.delete(input);
	}
}
