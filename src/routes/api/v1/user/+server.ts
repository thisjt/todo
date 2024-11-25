import type { RequestHandler } from './$types';
import { UserController } from '$controller/user';
import { UserApplication } from '$application/user';
import { PrismaUserRepository } from '$infrastructure/prisma-user';
import { ParseError, UnauthorizedError } from '$entities/errors';
import { prismaD1 } from '$lib/server/prisma';
import { z, createRoute } from '@hono/zod-openapi';
import * as StatusCodes from 'stoker/http-status-codes';
import app from '$lib/server/honoapp';
import jsonContent from 'stoker/openapi/helpers/json-content';

const loginSchema = z.object({
	username: z.string().openapi('Username'),
	password: z.string().openapi('Password')
});

const errorSchema = z.object({
	error: z.string()
});

const resultSchema = z.object({
	id: z.number(),
	username: z.string(),
	name: z.string()
});

const route = createRoute({
	method: 'post',
	path: '/api/v1/user',
	request: {
		body: jsonContent(loginSchema, 'Login User')
	},
	responses: {
		[StatusCodes.CREATED]: jsonContent(resultSchema, 'Login Successful'),
		[StatusCodes.BAD_REQUEST]: jsonContent(errorSchema, 'Bad Request'),
		[StatusCodes.UNAUTHORIZED]: jsonContent(errorSchema, 'Unauthorized'),
		[StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(errorSchema, 'Internal Server Error')
	}
});

export const _POST = app.openapi(route, async (ctx) => {
	const userRepository = new PrismaUserRepository(prismaD1(ctx.env.DB));
	const userApplication = new UserApplication(userRepository);
	const userController = new UserController(userApplication);

	try {
		let body: { username: string; password: string };
		try {
			body = ctx.req.valid('json');
		} catch (error) {
			throw new ParseError('Invalid request body', { cause: error });
		}
		const { username, password } = body;

		if (!username || !password) {
			return ctx.json({ error: 'Username and password are required' }, StatusCodes.BAD_REQUEST);
		}

		const user = await userController.login({ username, password });

		return ctx.json(
			{
				id: user.id,
				name: user.name || '',
				username: user.username
			},
			StatusCodes.CREATED
		);
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return ctx.json({ error: error.message }, StatusCodes.UNAUTHORIZED);
		}
		if (error instanceof ParseError) {
			return ctx.json({ error: error.message }, StatusCodes.BAD_REQUEST);
		}

		return ctx.json({ error: 'Internal server error' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

export const POST: RequestHandler = async ({ request, platform }) => {
	return _POST.fetch(request, platform);
};
