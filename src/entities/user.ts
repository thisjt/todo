import type { User } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import type { Optional } from '$lib/utils/types';

export type UserCreateInput = Optional<Prisma.UserCreateInput, 'salt'>;

export type UserRead = User;

export type UserWithoutPassword = Optional<UserRead, 'password' | 'salt'>;

export type UserUpdateInput = Prisma.UserUpdateInput;

export type UserDeleteWhere = Prisma.UserWhereUniqueInput;

export type UserLoginInput = Pick<UserCreateInput, 'username' | 'password'>;
