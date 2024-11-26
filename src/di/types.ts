import type { OAHonoContext } from '$lib/types';

import type { IAuthenticationService } from '$src/application/services/AuthenticationService';

import type { IUsersRepository } from '$src/application/repositories/Users';

import type { ILoginUseCase } from '$src/application/usecases/authentication/Login';
import type { ISignUpUseCase } from '$src/application/usecases/authentication/SignUp';

import type { ILoginController } from '$src/interface-adapter/controller/auth/Login';
import type { ISignUpController } from '$src/interface-adapter/controller/auth/SignUp';

export const DI_SYMBOLS = {
	Context: Symbol.for('Context'),

	IAuthenticationService: Symbol.for('IAuthenticationService'),

	IUsersRepository: Symbol.for('IUsersRepository'),

	ILoginUseCase: Symbol.for('ILoginUseCase'),
	ISignUpUseCase: Symbol.for('ISignUpUseCase'),

	ILoginController: Symbol.for('ILoginController'),
	ISignUpController: Symbol.for('ISignUpController')
};

export interface DI_RETURN_TYPES {
	Context: OAHonoContext;

	IAuthenticationService: IAuthenticationService;

	IUsersRepository: IUsersRepository;

	ILoginUseCase: ILoginUseCase;
	ISignUpUseCase: ISignUpUseCase;

	ILoginController: ILoginController;
	ISignUpController: ISignUpController;
}
