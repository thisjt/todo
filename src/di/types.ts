import type { OAHonoContext } from '$lib/types';

import type { IAuthenticationService } from '$src/application/services/AuthenticationService';

import type { IUsersRepository } from '$src/application/repositories/Users';

import type { ILoginUseCase } from '$src/application/usecases/authentication/Login';

import type { ILoginController } from '$src/interface-adapter/controller/Login';

export const DI_SYMBOLS = {
	Context: Symbol.for('Context'),

	IAuthenticationService: Symbol.for('IAuthenticationService'),

	IUsersRepository: Symbol.for('IUsersRepository'),

	ILoginUseCase: Symbol.for('ILoginUseCase'),

	ILoginController: Symbol.for('ILoginController')
};

export interface DI_RETURN_TYPES {
	Context: OAHonoContext;

	IAuthenticationService: IAuthenticationService;

	IUsersRepository: IUsersRepository;

	ILoginUseCase: ILoginUseCase;

	ILoginController: ILoginController;
}
