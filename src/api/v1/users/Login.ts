import type { OpenAPIHonoConfig } from '$lib/types';
import { OpenAPIHono } from '@hono/zod-openapi';
import * as StatusCodes from 'stoker/http-status-codes';
import { setCookie } from 'hono/cookie';
import { AuthenticationError } from '$src/domain/errors';

import { loginRouteHandler } from '$src/interface-adapter/controller/auth/Login';

import { getDI } from '$src/di/container';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

export const loginRoute = app.openapi(loginRouteHandler, async (c) => {
	const { username, password } = c.req.valid('json');

	const loginController = getDI('ILoginController');

	try {
		const token = await loginController.execute({ username, password });
		setCookie(c, 'loginToken4', token, {
			secure: true,
			sameSite: 'strict',
			httpOnly: true
		});
		c.var.logger.info(username, 'Login Success');
		return c.json({ success: true }, StatusCodes.CREATED);
	} catch (error) {
		if (error instanceof AuthenticationError) {
			c.var.logger.info(error, 'Login Failed');
			return c.json({ success: false }, StatusCodes.UNAUTHORIZED);
		}
		c.var.logger.error(error, 'Internal Server Error');
		return c.json({ success: false }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});
