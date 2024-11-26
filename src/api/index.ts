import { OpenAPIHono } from '@hono/zod-openapi';
import type { OpenAPIHonoConfig } from '$lib/types';
import { mountPrismaDatabase } from './middleware/prisma';
import { mountOpenAPI } from './middleware/openapi';
import { mountPinoLogger } from './middleware/pino';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

// mount BEFORE routes
mountPrismaDatabase(app);
mountPinoLogger(app);

const routes = [] as const;

routes.forEach((route) => app.route('/', route));

// mount AFTER routes
mountOpenAPI(app);

export default app;
