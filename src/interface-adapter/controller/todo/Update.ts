import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';
import * as StatusCodes from 'stoker/http-status-codes';
import { jsonContentRequired } from 'stoker/openapi/helpers';

import { ReadTodoSchemaInput } from './Read';
import type { UpdateTodoUseCase } from '$src/application/usecases/todo/Update';
import { TodoSchema } from './Create';
import { Todo } from '$src/domain/Todo';

const UpdateTodoSchema = z.object({
	title: z.string().optional().openapi({}),
	details: z.string().optional().openapi({}),
	completed: z.boolean().optional().openapi({})
});

const FailedResponse = z.object({
	success: z.boolean().openapi({})
});

export const updateTodoRouteHandler = createRoute({
	method: 'patch',
	path: '/api/v1/todo/{id}',
	summary: 'Update Todo Entry',
	description: 'Updates a Todo Entry from the database',
	request: {
		params: ReadTodoSchemaInput,
		body: jsonContentRequired(UpdateTodoSchema, 'Update Entries')
	},
	responses: {
		[StatusCodes.OK]: jsonContentRequired(TodoSchema, 'Updated Entry Successfully'),
		[StatusCodes.NOT_FOUND]: jsonContentRequired(FailedResponse, 'Not Found'),
		[StatusCodes.UNAUTHORIZED]: jsonContentRequired(FailedResponse, 'Not Logged In'),
		[StatusCodes.INTERNAL_SERVER_ERROR]: jsonContentRequired(
			FailedResponse,
			'Internal Server Error'
		)
	}
});

export class UpdateTodoController {
	constructor(private _updateTodoUseCase: UpdateTodoUseCase) {}

	async execute(userId: number, id: number, updateTodoDetails: z.infer<typeof UpdateTodoSchema>) {
		const updateTodo = new Todo({
			id,
			...updateTodoDetails,
			userId
		});

		this._updateTodoUseCase.execute(updateTodo);
	}
}

export type IUpdateTodoController = typeof UpdateTodoController.prototype;
