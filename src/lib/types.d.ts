import type { PrismaClient } from '@prisma/client';
import type { PinoLogger } from 'hono-pino';

export type OpenAPIHonoConfig = {
	Bindings: Env;
	Variables: {
		prisma: PrismaClient;
		logger: PinoLogger;
	};
};
