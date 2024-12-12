import { OpenAPIHono } from '@hono/zod-openapi';
import type { OpenAPIHonoConfig } from '$lib/types';
import { mountPrismaDatabase } from './middleware/prisma';
import { mountOpenAPI } from './middleware/openapi';
import { mountPinoLogger } from './middleware/pino';

import { loginRoute } from './v1/users/Login';
import { signupRoute } from './v1/users/SignUp';
import { mountJWTAuth } from './middleware/jwt';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

// mount BEFORE routes
mountPinoLogger(app);
mountPrismaDatabase(app);
mountJWTAuth(app);

const routes = [loginRoute, signupRoute] as const;

routes.forEach((route) => app.route('/', route));

// mount AFTER routes
mountOpenAPI(app);

export type HonoRPC = (typeof routes)[number];

export default app;
