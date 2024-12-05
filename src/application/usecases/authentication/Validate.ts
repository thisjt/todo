import { AuthenticationError } from '$src/domain/Errors';

import type { IAuthenticationService } from '$src/application/services/AuthenticationService';
import type { IUsersRepository } from '$src/application/repositories/Users';

export class ValidateUseCase {
	constructor(
		private authenticationService: IAuthenticationService,
		private usersRepository: IUsersRepository
	) {}

	async execute(token: string, deepVerify?: boolean) {
		const session = await this.authenticationService.validateSession(token);

		if (!session) throw new AuthenticationError('Invalid Session Token');

		if (!deepVerify) return true;

		const user = await this.usersRepository.findId(session.id);

		if (!user) throw new AuthenticationError('Unknown User');

		return true;
	}
}
