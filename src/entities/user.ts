import type { User } from '@prisma/client';
import type { Prisma } from '@prisma/client';

export type UserEntity = User;

export type UserCreateInput = Prisma.UserCreateInput;

export type UserUpdateInput = Prisma.UserUpdateInput;

export type UserDeleteInput = Partial<UserEntity>;
