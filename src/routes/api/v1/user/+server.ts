import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { UserController } from '$controller/user';
import { UserApplication } from '$application/user';
import { PrismaUserRepository } from '$infrastructure/prisma-user';
import { ParseError, UnauthorizedError } from '$entities/errors';
import { prismaD1 } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request, platform }) => {
	if (!platform) throw new Error('Platform is required');

	const userRepository = new PrismaUserRepository(prismaD1(platform.env.DB));
	const userApplication = new UserApplication(userRepository);
	const userController = new UserController(userApplication);

	try {
		let body: { username: string; password: string };
		try {
			body = await request.json();
		} catch (error) {
			throw new ParseError('Invalid request body', { cause: error });
		}
		const { username, password } = body;

		if (!username || !password) {
			return json({ error: 'Username and password are required' }, { status: 400 });
		}

		const user = await userController.login({ username, password });

		return json(user);
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return json({ error: error.message }, { status: 401 });
		}
		if (error instanceof ParseError) {
			return json({ error: error.message }, { status: 400 });
		}

		return json({ error: 'Internal server error', cause: error }, { status: 500 });
	}
};
