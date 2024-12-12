import type { Session } from '$src/domain/Session';
import type { PrismaClient } from '@prisma/client';
import type { Context } from 'hono';
import type { PinoLogger } from 'hono-pino';

export type OpenAPIHonoConfig = {
	Bindings: Env;
	Variables: {
		prisma: PrismaClient;
		logger: PinoLogger;
		user: ReturnType<Session['getData']> | null;
	};
};

export type OAHonoContext = Context<OpenAPIHonoConfig>;
