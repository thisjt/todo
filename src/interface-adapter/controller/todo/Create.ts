import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';
import { jsonContentRequired } from 'stoker/openapi/helpers';
import * as StatusCodes from 'stoker/http-status-codes';

import { CreateTodoUseCase } from '$src/application/usecases/todo/Create';

const TodoSchemaRaw = {
	title: z.string().openapi({}),
	details: z.string().openapi({}),
	completed: z.boolean().openapi({})
};

export const TodoSchema = z.object({
	id: z.number().openapi({}),
	...TodoSchemaRaw
});

export const CreateTodoSchema = z.object(TodoSchemaRaw);

const FailedResponse = z.object({
	success: z.boolean().openapi({})
});

export const createTodoRouteHandler = createRoute({
	method: 'post',
	path: '/api/v1/todo',
	summary: 'Create Todo Entry',
	description: 'Create a Todo Entry to the database',
	request: {
		body: jsonContentRequired(CreateTodoSchema, 'Create Todo Request Body')
	},
	responses: {
		[StatusCodes.CREATED]: jsonContentRequired(TodoSchema, 'Created Todo Successfully'),
		[StatusCodes.BAD_REQUEST]: jsonContentRequired(FailedResponse, 'Missing Fields'),
		[StatusCodes.UNAUTHORIZED]: jsonContentRequired(FailedResponse, 'Not Logged In'),
		[StatusCodes.INTERNAL_SERVER_ERROR]: jsonContentRequired(
			FailedResponse,
			'Internal Server Error'
		)
	}
});

export class CreateTodoController {
	constructor(private _createTodoUseCase: CreateTodoUseCase) {}

	async execute(createTodoDetails: z.infer<typeof CreateTodoSchema>, userId: number) {
		return this._createTodoUseCase.execute({ ...createTodoDetails, ...{ userId } });
	}
}

export type ICreateTodoController = typeof CreateTodoController.prototype;
