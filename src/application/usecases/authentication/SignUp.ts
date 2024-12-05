import { AlreadyExists } from '$src/domain/Errors';
import { Users } from '$src/domain/Users';
import { Session } from '$src/domain/Session';

import type { IAuthenticationService } from '$src/application/services/AuthenticationService';
import type { IUsersRepository } from '$src/application/repositories/Users';

interface SignUpDTO {
	username: string;
	password: string;
	name: string;
}

export class SignUpUseCase {
	constructor(
		private authenticationService: IAuthenticationService,
		private usersRepository: IUsersRepository
	) {}

	async execute(signUpDetails: SignUpDTO) {
		const user = await this.usersRepository.findUsername(signUpDetails.username);

		if (user) throw new AlreadyExists('User', user.id);

		const salt = this.authenticationService.generateSalt();

		const seed = this.authenticationService.generateRandom(32);

		const hashedPassword = this.authenticationService.hashPassword(signUpDetails.password, salt);

		const newUser = new Users({
			id: 0,
			username: signUpDetails.username,
			password: hashedPassword,
			salt,
			name: signUpDetails.name
		});

		const createdUser = await this.usersRepository.create(newUser);

		return this.authenticationService.createToken(new Session(createdUser, seed));
	}
}

export type ISignUpUseCase = typeof SignUpUseCase.prototype;
