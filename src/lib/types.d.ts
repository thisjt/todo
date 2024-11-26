import type { PrismaClient } from '@prisma/client';
import type { Context } from 'hono';
import type { PinoLogger } from 'hono-pino';

export type OpenAPIHonoConfig = {
	Bindings: Env;
	Variables: {
		prisma: PrismaClient;
		logger: PinoLogger;
	};
};

export type OAHonoContext = Context<OpenAPIHonoConfig>;
