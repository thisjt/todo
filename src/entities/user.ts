import type { User } from '@prisma/client';
import type { Prisma } from '@prisma/client';
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type UserEntity = User;

export type UserCreateInput = Optional<Prisma.UserCreateInput, 'salt'>;

export type UserUpdateInput = Prisma.UserUpdateInput;

export type UserDeleteInput = Prisma.UserWhereUniqueInput;
