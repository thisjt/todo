import type { IUsersRepository } from '$src/application/repositories/Users';
import type { OAHonoContext } from '$lib/types';
import type { IAuthenticationService } from '$src/application/services/AuthenticationService';
import { DatabaseError } from '$src/domain/Errors';
import { Users } from '$src/domain/Users';

export class UsersRepository implements IUsersRepository {
	constructor(
		private _context: OAHonoContext,
		private _authenticationService: IAuthenticationService
	) {}

	async create(users: Users) {
		const salt = users.getSalt();
		const password = users.unsafeGetData().password;

		try {
			await this._context.var.prisma.user.create({
				data: {
					username: users.username,
					password,
					salt,
					name: users.name
				}
			});
		} catch (error) {
			this._context.var.logger.error(error, 'Create User Failed');
			throw new DatabaseError('Create User Failed');
		}
	}

	async findUsername(username: string) {
		try {
			const dbUser = await this._context.var.prisma.user.findFirst({
				where: {
					username
				}
			});
			if (!dbUser) return null;

			return new Users({
				...dbUser,
				...{ name: dbUser.name || '[not set]' }
			});
		} catch (error) {
			this._context.var.logger.error(error, 'Find Username Failed');
			throw new DatabaseError('Find Username Failed');
		}
	}

	async findId(id: number) {
		try {
			const dbUser = await this._context.var.prisma.user.findFirst({
				where: {
					id
				}
			});
			if (!dbUser) return null;

			return new Users({
				...dbUser,
				...{ name: dbUser.name || '[not set]' }
			});
		} catch (error) {
			this._context.var.logger.error(error, 'Find ID Failed');
			throw new DatabaseError('Find ID Failed');
		}
	}

	async update(users: Users) {
		try {
			const updatedData = await this._context.var.prisma.user.update({
				where: {
					id: users.id
				},
				data: users.unsafeGetData()
			});
			return new Users({
				...updatedData,
				...{ name: updatedData.name || '[not set]' }
			});
		} catch (error) {
			this._context.var.logger.error(error, 'User Update Failed', users.id, users.username);
			throw new DatabaseError('User Update Failed');
		}
	}

	async delete(id: number) {
		try {
			await this._context.var.prisma.user.delete({
				where: { id }
			});
		} catch (error) {
			this._context.var.logger.error(error, 'User Delete Failed', id);
			throw new DatabaseError('User Delete Failed');
		}
	}
}
