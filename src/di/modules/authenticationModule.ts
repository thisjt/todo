import type { Container } from '@evyweb/ioctopus';

import { AuthenticationService } from '$src/infrastructure/services/AuthenticationService';

import { DI_SYMBOLS } from '../types';

export function registerAuthenticationModule(container: Container) {
	container
		.bind(DI_SYMBOLS.IAuthenticationService)
		.toClass(AuthenticationService, [DI_SYMBOLS.Context]);
}
