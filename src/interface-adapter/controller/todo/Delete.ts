import type { DeleteTodoUseCase } from '$src/application/usecases/todo/Delete';
import { createRoute, z } from '@hono/zod-openapi';
import * as StatusCodes from 'stoker/http-status-codes';
import { jsonContentRequired } from 'stoker/openapi/helpers';

const DeleteTodoSchema = z.object({
	id: z.number().openapi({})
});

const SuccessOrFailedResponse = z.object({
	success: z.boolean().openapi({})
});

export const deleteTodoRouteHandler = createRoute({
	method: 'delete',
	path: '/api/v1/todo/{id}',
	summary: 'Delete Todo Entry',
	description: 'Delete a Todo Entry from the database',
	request: {
		params: DeleteTodoSchema
	},
	responses: {
		[StatusCodes.OK]: jsonContentRequired(SuccessOrFailedResponse, 'Deleted Successfully'),
		[StatusCodes.NOT_FOUND]: jsonContentRequired(SuccessOrFailedResponse, 'Not Found'),
		[StatusCodes.UNAUTHORIZED]: jsonContentRequired(SuccessOrFailedResponse, 'Not Logged In'),
		[StatusCodes.INTERNAL_SERVER_ERROR]: jsonContentRequired(
			SuccessOrFailedResponse,
			'Internal Server Error'
		)
	}
});

export class DeleteTodoController {
	constructor(private _deleteTodoUseCase: DeleteTodoUseCase) {}

	async execute(id: number) {
		this._deleteTodoUseCase.execute(id);
	}
}

export type IDeleteTodoController = typeof DeleteTodoController.prototype;
