import type { OpenAPIHonoConfig } from '$lib/types';
import type { OpenAPIHono } from '@hono/zod-openapi';

import { apiReference } from '@scalar/hono-api-reference';

export function mountOpenAPI(app: OpenAPIHono<OpenAPIHonoConfig>) {
	app.doc('/api/v1/documentation/_', {
		openapi: '3.1.0',
		info: {
			version: '0.0.0',
			title: 'T',
			description: 'D',
			contact: {
				name: 'a',
				url: 'b',
				email: 'c'
			}
		}
	});

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
}
