import type { OpenAPIHono } from '@hono/zod-openapi';
import type { OpenAPIHonoConfig } from '$lib/types';
import { registerContextModule } from '$src/di/ctxmodule/contextModule';

import { applicationContainer } from '$src/di/container';

export function mountContextToDI(app: OpenAPIHono<OpenAPIHonoConfig>) {
	app.use(async (c, next) => {
		registerContextModule(applicationContainer, c);
		await next();
	});
}
