import type { OpenAPIHonoConfig } from '$lib/types';
import { createTodoRouteHandler } from '$src/interface-adapter/controller/todo/Create';
import { OpenAPIHono } from '@hono/zod-openapi';

import { getDI } from '$src/di/container';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

export const createTodoRoute = app.openapi(createTodoRouteHandler, async (c) => {
	const { title, details, completed } = c.req.valid('json');

	const createTodoController = getDI('ICreateTodoController');

	const todo = await createTodoController.execute(
		{
			title,
			details,
			completed
		},
		1
	);

	return c.json(todo.getData(), 201);
});
