import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';
import { jsonContentRequired } from 'stoker/openapi/helpers';
import * as StatusCodes from 'stoker/http-status-codes';

import { LoginUseCase } from '$src/application/usecases/authentication/Login';

const LoginSchema = z.object({
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
	})
});

const LoginSuccessOrFailedResponse = z.object({
	success: z.boolean().openapi({
		title: 'Success or Failed Login',
		description: 'Indicates if the login was successful',
		type: 'boolean',
		example: true
	})
});

export const loginRouteHandler = createRoute({
	method: 'post',
	path: '/api/v1/auth/login',
	summary: 'Login',
	description: 'Login to the system',
	request: {
		body: jsonContentRequired(LoginSchema, 'Login Request Body')
	},
	responses: {
		[StatusCodes.CREATED]: jsonContentRequired(
			LoginSuccessOrFailedResponse,
			'Login Success Response'
		),
		[StatusCodes.UNAUTHORIZED]: jsonContentRequired(
			LoginSuccessOrFailedResponse,
			'Login Failed Response'
		),
		[StatusCodes.INTERNAL_SERVER_ERROR]: jsonContentRequired(
			LoginSuccessOrFailedResponse,
			'Internal Server Error'
		)
	}
});

export class LoginController {
	constructor(private _loginUseCase: LoginUseCase) {}

	async execute(credentials: z.infer<typeof LoginSchema>) {
		return await this._loginUseCase.execute(credentials);
	}
}

export type ILoginController = typeof LoginController.prototype;
