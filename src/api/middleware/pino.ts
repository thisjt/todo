import type { OpenAPIHonoConfig } from '$lib/types';
import type { OpenAPIHono } from '@hono/zod-openapi';

import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';
import crypto from 'crypto';

export function mountPinoLogger(app: OpenAPIHono<OpenAPIHonoConfig>) {
	app.use(
		pinoLogger({
			pino: pino(
				{
					level: 'info'
				},
				pretty({
					ignore: 'req.headers,err.stack'
				})
			),
			http: {
				reqId: () => crypto.randomUUID()
			}
		})
	);
}
