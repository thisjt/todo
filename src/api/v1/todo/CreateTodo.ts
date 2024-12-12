import type { OpenAPIHonoConfig } from '$lib/types';
import { createTodoRouteHandler } from '$src/interface-adapter/controller/todo/Create';
import { OpenAPIHono } from '@hono/zod-openapi';

import { getDI } from '$src/di/container';

const app = new OpenAPIHono<OpenAPIHonoConfig>();

export const createTodoRoute = app.openapi(createTodoRouteHandler, async (c) => {
	if (!c.var.user) return c.json({ success: false }, 401);
	const createTodoData = c.req.valid('json');
	const createTodoController = getDI('ICreateTodoController');
	const todo = await createTodoController.execute(createTodoData, c.var.user.id);
	return c.json(todo.getData(), 201);
});
