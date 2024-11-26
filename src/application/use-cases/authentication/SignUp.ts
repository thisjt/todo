import { AuthenticationError } from '$src/domain/entities/errors';
import { Users } from '$src/domain/entities/Users';
import { Session } from '$src/domain/entities/Session';

import type { IAuthenticationService } from '$src/application/services/AuthenticationService';
import type { IUsersRepository } from '$src/application/repositories/Users';

interface SignUpDTO {
	username: string;
	password: string;
	repeatPassword: string;
	name: string;
}

export class SignUpUseCase {
	constructor(
		private authenticationService: IAuthenticationService,
		private usersRepository: IUsersRepository
	) {}

	async execute(signUpDetails: SignUpDTO) {
		const user = await this.usersRepository.findUsername(signUpDetails.username);

		if (user) throw new AuthenticationError('Username Exists');

		const salt = this.authenticationService.generateSalt();

		const hashedPassword = this.authenticationService.hashPassword(signUpDetails.password, salt);

		const newUser = new Users({
			id: 0,
			username: signUpDetails.username,
			password: hashedPassword,
			salt,
			name: signUpDetails.name
		});

		await this.usersRepository.create(newUser);

		return this.authenticationService.createToken(new Session(newUser));
	}
}
