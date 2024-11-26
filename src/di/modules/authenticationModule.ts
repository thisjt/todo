import type { Container } from '@evyweb/ioctopus';

import { AuthenticationService } from '$src/infrastructure/services/AuthenticationService';
import { LoginUseCase } from '$src/application/usecases/authentication/Login';
import { SignUpUseCase } from '$src/application/usecases/authentication/SignUp';
import { LoginController } from '$src/interface-adapter/controller/auth/Login';
import { UsersRepository } from '$src/infrastructure/repositories/Users';

import { DI_SYMBOLS } from '../types';
import { SignUpController } from '$src/interface-adapter/controller/auth/SignUp';

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
	container
		.bind(DI_SYMBOLS.ISignUpUseCase)
		.toClass(SignUpUseCase, [DI_SYMBOLS.IAuthenticationService, DI_SYMBOLS.IUsersRepository]);

	container.bind(DI_SYMBOLS.ILoginController).toClass(LoginController, [DI_SYMBOLS.ILoginUseCase]);
	container
		.bind(DI_SYMBOLS.ISignUpController)
		.toClass(SignUpController, [DI_SYMBOLS.ISignUpUseCase, DI_SYMBOLS.IAuthenticationService]);
}
