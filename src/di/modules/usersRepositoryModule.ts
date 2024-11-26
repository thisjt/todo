import type { Container } from '@evyweb/ioctopus';

import { UsersRepository } from '$src/infrastructure/repositories/Users';

import { DI_SYMBOLS } from '../types';

export function registerUsersRepositoryModule(container: Container) {
	container
		.bind(DI_SYMBOLS.IUsersRepository)
		.toClass(UsersRepository, [DI_SYMBOLS.Context, DI_SYMBOLS.IAuthenticationService]);
}
