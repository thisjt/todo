import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';
import { jsonContentRequired } from 'stoker/openapi/helpers';
import * as StatusCodes from 'stoker/http-status-codes';

import { IdParamsSchema } from "stoker/openapi/schemas";

import { ReadTodoUseCase } from '$src/application/usecases/todo/Read';
import { ReadManyTodoUseCase } from '$src/application/usecases/todo/ReadFromUser';

import { TodoSchema } from './Create';
import { CreateTodoSchema } from './Create';

const ReadTodoSchemaInput = z.object({
    id: z.coerce.number().optional().openapi({})
});

const ArrayCreateTodoSchema = z.array(CreateTodoSchema);

const FailedResponse = z.object({
	success: z.boolean().openapi({})
});

export const readTodoRouteHandler = createRoute({
    method: 'get',
	path: '/api/v1/todo/{id}',
	summary: 'Read Todo Entry',
	description: 'Read a Todo Entry from the database',
	request: {
        params: IdParamsSchema
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

export class ReadTodoController {
    constructor(private _readTodoUseCase: ReadTodoUseCase, private _readManyTodoUseCase: ReadManyTodoUseCase) {}

    async execute(userId: number, id?: number) {
        if (id) return _readTodoUseCase.execute(id);

		return _readManyTodoUseCase.execute();
    }
}

export type IReadTodoController = typeof ReadTodoController.prototype;
