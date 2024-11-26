import type { OpenAPIHonoConfig } from '$lib/types';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { jsonContentRequired } from 'stoker/openapi/helpers';
import * as StatusCodes from 'stoker/http-status-codes';
import { getCookie, setCookie } from 'hono/cookie';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

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

const loginRoute = createRoute({
	method: 'post',
	path: '/api/v1/login',
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

export const signInRoute = app.openapi(loginRoute, async (c) => {
	const { username, password } = c.req.valid('json');
	const [error, token] = await this.loginUseCase.login({ username, password });

	if (error instanceof AuthenticationError) {
		c.var.logger.info(error, 'Login Failed');
		return c.json({ success: false }, StatusCodes.UNAUTHORIZED);
	} else if (error) {
		c.var.logger.error(error, 'Internal Server Error');
		return c.json({ success: false }, StatusCodes.INTERNAL_SERVER_ERROR);
	}

	setCookie(c, 'loginToken3', token, {
		secure: true,
		sameSite: 'strict',
		httpOnly: true
	});
	c.var.logger.info(username, 'Login Success');
	return c.json({ success: true }, StatusCodes.CREATED);
});
