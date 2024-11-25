import app from '$lib/server/honoapp';
import type { RequestHandler } from './$types';
import { _POST } from '../../user/+server';

const routes = [_POST] as const;

routes.forEach((route) => app.route('/', route));

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

export const GET: RequestHandler = async ({ request, platform }) => {
	return app.fetch(request, platform);
};
