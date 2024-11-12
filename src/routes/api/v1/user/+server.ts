import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { UserController } from '$controller/user';
import { UserApplication } from '$application/user';
import { PrismaUserRepository } from '$infrastructure/prisma-user';
import { UnauthorizedError } from '$entities/errors';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { username, password }: { username: string; password: string } = await request.json();

		if (!username || !password) {
			return json({ error: 'Username and password are required' }, { status: 400 });
		}

		const userRepository = new PrismaUserRepository(prisma);
		const userApplication = new UserApplication(userRepository);
		const userController = new UserController(userApplication);

		const user = await userController.login({ username, password });

		return json(user);
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return json({ error: error.message }, { status: 401 });
		}

		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
