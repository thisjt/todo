import type { IUserRepository } from '../interface/user-repository';
import { PrismaClient } from '@prisma/client';
import type { UserCreateInput, UserDeleteWhere, UserRead, UserUpdateInput } from '../entities/user';
import { DatabaseError } from '../entities/errors';

export class PrismaUserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {}

	async create(input: UserCreateInput): Promise<UserRead> {
		try {
			return this.prisma.user.create({
				data: {
					...input,
					salt: input.salt ?? ''
				}
			});
		} catch (error) {
			throw new DatabaseError('Failed to create user', { cause: error });
		}
	}

	async findAll(): Promise<UserRead[]> {
		try {
			return this.prisma.user.findMany();
		} catch (error) {
			throw new DatabaseError('Failed to find all users', { cause: error });
		}
	}

	async findById(id: number): Promise<UserRead | null> {
		try {
			return this.prisma.user.findUnique({
				where: { id }
			});
		} catch (error) {
			throw new DatabaseError('Failed to find user by id', { cause: error });
		}
	}

	async findByUsername(username: string): Promise<UserRead | null> {
		try {
			return this.prisma.user.findUnique({
				where: { username }
			});
		} catch (error) {
			throw new DatabaseError('Failed to find user by username', { cause: error });
		}
	}

	async update(id: number, input: UserUpdateInput): Promise<UserRead> {
		try {
			return this.prisma.user.update({
				where: { id },
				data: input
			});
		} catch (error) {
			throw new DatabaseError('Failed to update user', { cause: error });
		}
	}

	async delete(input: UserDeleteWhere): Promise<UserRead> {
		try {
			return this.prisma.user.delete({
				where: input
			});
		} catch (error) {
			throw new DatabaseError('Failed to delete user', { cause: error });
		}
	}
}
