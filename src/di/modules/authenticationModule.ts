import type { Container } from '@evyweb/ioctopus';

import { AuthenticationService } from '$src/infrastructure/services/AuthenticationService';
import { LoginUseCase } from '$src/application/use-cases/authentication/login';
import { LoginController } from '$src/interface-adapter/controller/Login';
import { UsersRepository } from '$src/infrastructure/repositories/Users';

import { DI_SYMBOLS } from '../types';

export function registerAuthenticationModule(container: Container) {
	container
		.bind(DI_SYMBOLS.IAuthenticationService)
		.toClass(AuthenticationService, [DI_SYMBOLS.Context]);

	container
		.bind(DI_SYMBOLS.IUsersRepository)
		.toClass(UsersRepository, [DI_SYMBOLS.Context, DI_SYMBOLS.IAuthenticationService]);

	container
		.bind(DI_SYMBOLS.ILoginUseCase)
		.toClass(LoginUseCase, [DI_SYMBOLS.IAuthenticationService, DI_SYMBOLS.IUsersRepository]);

	container.bind(DI_SYMBOLS.ILoginController).toClass(LoginController, [DI_SYMBOLS.ILoginUseCase]);
}
