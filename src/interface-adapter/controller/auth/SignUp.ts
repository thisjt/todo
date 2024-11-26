import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';
import { jsonContentRequired } from 'stoker/openapi/helpers';
import * as StatusCodes from 'stoker/http-status-codes';

import { SignUpUseCase } from '$src/application/usecases/authentication/SignUp';
import type { IAuthenticationService } from '$src/application/services/AuthenticationService';
import { InvalidSignupToken } from '$src/domain/errors';

const SignupSchema = z.object({
	username: z.string().openapi({
		title: 'Username',
		description: 'The username of the user',
		type: 'string',
		format: 'username',
		example: 'john.doe'
	}),
	password: z.string().openapi({
		title: 'Password',
		description: 'The password of the user',
		type: 'string',
		format: 'password',
		example: 'password123'
	}),
	name: z.string().openapi({
		title: 'Name',
		description: 'Full Name of the user',
		type: 'string',
		format: 'firstname lastname',
		example: 'John Doe'
	}),
	signupToken: z.string().openapi({
		title: 'Signup Token',
		description: 'Signup Token given by the developer [This service is not public.]',
		type: 'string',
		format: 'abcdefgh12345678'
	}),
	loginAutomatically: z.boolean().optional().openapi({
		title: 'Login Automatically',
		description: 'Logs in the use automatically on a successful Signup',
		type: 'boolean'
	})
});

const SignupSuccessOrFailedResponse = z.object({
	success: z.boolean().openapi({
		title: 'Success or Failed Response',
		description: 'Indicates if the signup was successful',
		type: 'boolean',
		example: true
	})
});

export const signupRouteHandler = createRoute({
	method: 'post',
	path: '/api/v1/signup',
	summary: 'Sign Up',
	description: 'Sign up to the system',
	request: {
		body: jsonContentRequired(SignupSchema, 'Login Request Body')
	},
	responses: {
		[StatusCodes.CREATED]: jsonContentRequired(
			SignupSuccessOrFailedResponse,
			'Signup Success Response'
		),
		[StatusCodes.UNAUTHORIZED]: jsonContentRequired(
			SignupSuccessOrFailedResponse,
			'Signup Not Allowed Response'
		),
		[StatusCodes.BAD_REQUEST]: jsonContentRequired(
			SignupSuccessOrFailedResponse,
			'Missing or Incorrect Data Provided'
		),
		[StatusCodes.INTERNAL_SERVER_ERROR]: jsonContentRequired(
			SignupSuccessOrFailedResponse,
			'Internal Server Error'
		)
	}
});

export class SignUpController {
	constructor(
		private _signupUseCase: SignUpUseCase,
		private _authenticationService: IAuthenticationService
	) {}

	async execute(signupDetails: z.infer<typeof SignupSchema>) {
		if (!this._authenticationService.validateSignupToken(signupDetails.signupToken))
			throw new InvalidSignupToken('Invalid Signup Token');

		const token = await this._signupUseCase.execute(signupDetails);

		return { token: signupDetails.loginAutomatically ? token : null };
	}
}

export type ISignUpController = typeof SignUpController.prototype;
