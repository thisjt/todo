import type { IUserRepository } from '../interface/user-repository';
import { PrismaClient } from '@prisma/client';
import type {
	UserCreateInput,
	UserDeleteInput,
	UserEntity,
	UserUpdateInput
} from '../entities/user';

export class PrismaUserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {}

	async create(input: UserCreateInput): Promise<UserEntity> {
		return this.prisma.user.create({
			data: {
				...input,
				salt: input.salt ?? ''
			}
		});
	}

	async findById(id: number): Promise<UserEntity | null> {
		return this.prisma.user.findUnique({
			where: { id }
		});
	}

	async findByUsername(username: string): Promise<UserEntity | null> {
		return this.prisma.user.findUnique({
			where: { username }
		});
	}

	async update(id: number, input: UserUpdateInput): Promise<UserEntity> {
		return this.prisma.user.update({
			where: { id },
			data: input
		});
	}

	async delete(input: UserDeleteInput): Promise<UserEntity> {
		return this.prisma.user.delete({
			where: input
		});
	}
}
