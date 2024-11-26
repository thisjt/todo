import type { OpenAPIHonoConfig } from '$lib/types';
import type { OpenAPIHono } from '@hono/zod-openapi';
import packageJSON from '$root/package.json';

import { apiReference } from '@scalar/hono-api-reference';

export function mountOpenAPI(app: OpenAPIHono<OpenAPIHonoConfig>) {
	app.doc('/api/v1/documentation/_', {
		openapi: '3.1.0',
		info: {
			version: packageJSON.version,
			title: `${packageJSON.properName} - API Documentation`,
			description: packageJSON.description,
			contact: {
				name: packageJSON.author,
				url: packageJSON.authorUrl,
				email: packageJSON.authorEmail
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
