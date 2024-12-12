import type { OpenAPIHonoConfig } from '$lib/types';
import type { Session } from '$src/domain/Session';
import type { OpenAPIHono } from '@hono/zod-openapi';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

export function mountJWTAuth(app: OpenAPIHono<OpenAPIHonoConfig>) {
	app.use(async (c, next) => {
		c.set('user', null);

		const path = c.req.path;
		if (path.startsWith('/api/v1/auth/')) {
			await next();
			return;
		}

		const jwtToken = getCookie(c, 'loginToken4');
		if (!jwtToken) {
			await next();
			return;
		}

		const decoded = (await verify(jwtToken, c.env.JWT_SECRET)) as ReturnType<
			Session['getData']
		> | null;
		if (!decoded) {
			await next();
			return;
		}

		c.set('user', decoded);

		await next();
	});
}
