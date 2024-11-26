import type { OpenAPIHonoConfig } from '$lib/types';
import type { OpenAPIHono } from '@hono/zod-openapi';
import { dev } from '$app/environment';

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
				dev
					? pretty({
							ignore: 'req.headers,err.stack'
						})
					: undefined
			),
			http: {
				reqId: () => crypto.randomUUID()
			}
		})
	);
}
