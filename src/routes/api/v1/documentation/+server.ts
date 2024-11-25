import { apiReference } from '@scalar/hono-api-reference';
import type { RequestHandler } from './$types';
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono();

app.get(
	'/api/v1/documentation',
	apiReference({
		theme: 'kepler',
		layout: 'modern',
		defaultHttpClient: {
			targetKey: 'javascript',
			clientKey: 'fetch'
		},
		hideDownloadButton: true,
		withDefaultFonts: false,
		defaultOpenAllTags: true,
		spec: {
			url: '/api/v1/documentation/_'
		}
	})
);

export const GET: RequestHandler = async ({ request, platform }) => {
	return app.fetch(request, platform);
};
