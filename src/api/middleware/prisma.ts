import type { OpenAPIHono } from '@hono/zod-openapi';
import type { OpenAPIHonoConfig } from '$lib/types';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { registerContextModule } from '$src/di/ctxmodule/contextModule';

import { applicationContainer } from '$src/di/container';

export function mountPrismaDatabase(app: OpenAPIHono<OpenAPIHonoConfig>) {
	app.use(async (c, next) => {
		const adapter = new PrismaD1(c.env.DB);
		const client = new PrismaClient({ adapter });
		c.set('prisma', client);
		await next();
	});

	app.use(async (c, next) => {
		registerContextModule(applicationContainer, c);
		await next();
	});
}
