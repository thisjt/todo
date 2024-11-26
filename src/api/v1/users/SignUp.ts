import type { OpenAPIHonoConfig } from '$lib/types';
import { OpenAPIHono } from '@hono/zod-openapi';
import * as StatusCodes from 'stoker/http-status-codes';
import { setCookie } from 'hono/cookie';

import { signupRouteHandler } from '$src/interface-adapter/controller/SignUp';

import { getDI } from '$src/di/container';
import { InvalidSignupToken, UserAlreadyExists } from '$src/domain/errors';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

export const signupRoute = app.openapi(signupRouteHandler, async (c) => {
	const requestData = c.req.valid('json');

	const signupController = getDI('ISignUpController');

	try {
		const result = await signupController.execute(requestData);
		if (result.token) {
			setCookie(c, 'loginToken4', result.token, {
				secure: true,
				sameSite: 'strict',
				httpOnly: true
			});
		}
		c.var.logger.info(requestData.username, 'Signup Success');
		return c.json({ success: true }, StatusCodes.CREATED);
	} catch (error) {
		if (error instanceof InvalidSignupToken) {
			c.var.logger.info(error, 'Invalid Signup Token', requestData.username);
			return c.json({ success: false }, StatusCodes.UNAUTHORIZED);
		}
		if (error instanceof UserAlreadyExists) {
			c.var.logger.info(error, 'User Already Exists', requestData.username);
			return c.json({ success: false }, StatusCodes.BAD_REQUEST);
		}
		c.var.logger.error(error, 'Internal Server Error');
		return c.json({ success: false }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});
