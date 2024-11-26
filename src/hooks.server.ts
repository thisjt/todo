import app from '$api';

export async function handle({ event, resolve }) {
	const pathname = event.url.pathname;
	let response: Response | Promise<Response>;

	if (pathname.split('/')[1] === 'api') {
		response = app.fetch(event.request, event.platform?.env);
	} else {
		response = resolve(event);
	}

	return response;
}
