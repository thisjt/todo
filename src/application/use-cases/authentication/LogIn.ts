import { Session } from '$src/domain/Session';
import { AuthenticationError } from '$src/domain/errors';

import type { IAuthenticationService } from '$src/application/services/AuthenticationService';
import type { IUsersRepository } from '$src/application/repositories/Users';

interface LoginDTO {
	username: string;
	password: string;
}

export class LoginUseCase {
	constructor(
		private authenticationService: IAuthenticationService,
		private usersRepository: IUsersRepository
	) {}

	async execute(credentials: LoginDTO) {
		const user = await this.usersRepository.findUsername(credentials.username);
		if (!user) throw new AuthenticationError('Missing Username');

		const salt = user.getSalt();

		const seed = this.authenticationService.generateRandom(32);

		const hashedPassword = this.authenticationService.hashPassword(credentials.password, salt);

		const isValid = this.authenticationService.validatePassword(user, hashedPassword);

		if (!isValid) throw new AuthenticationError('Incorrect Password');

		return this.authenticationService.createToken(new Session(user, seed));
	}
}

export type ILoginUseCase = typeof LoginUseCase.prototype;
