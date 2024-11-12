import type {
	UserCreateInput,
	UserUpdateInput,
	UserDeleteWhere,
	UserLoginInput
} from '../entities/user';
import { UserApplication } from '../application/user';
import { UnauthorizedError } from '../entities/errors';

export class UserController {
	constructor(private userApplication: UserApplication) {}

	async login(input: UserLoginInput) {
		const userWithoutPassword = await this.userApplication.login(input);
		if (!userWithoutPassword) {
			throw new UnauthorizedError('Invalid username or password');
		}
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
