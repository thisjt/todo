import type { Container } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { CreateTodoUseCase } from '$src/application/usecases/todo/Create';
import { CreateTodoController } from '$src/interface-adapter/controller/todo/Create';
import { ReadTodoController } from '$src/interface-adapter/controller/todo/Read';
import { ReadTodoUseCase } from '$src/application/usecases/todo/Read';
import { ReadManyTodoUseCase } from '$src/application/usecases/todo/ReadFromUser';
import { UpdateTodoController } from '$src/interface-adapter/controller/todo/Update';
import { UpdateTodoUseCase } from '$src/application/usecases/todo/Update';
import { DeleteTodoUseCase } from '$src/application/usecases/todo/Delete';
import { DeleteTodoController } from '$src/interface-adapter/controller/todo/Delete';

export function registerTodoModule(container: Container) {
	container
		.bind(DI_SYMBOLS.ICreateTodoUseCase)
		.toClass(CreateTodoUseCase, [DI_SYMBOLS.ITodoRepository]);

	container
		.bind(DI_SYMBOLS.ICreateTodoController)
		.toClass(CreateTodoController, [DI_SYMBOLS.ICreateTodoUseCase]);

	container
		.bind(DI_SYMBOLS.IReadTodoUseCase)
		.toClass(ReadTodoUseCase, [DI_SYMBOLS.ITodoRepository]);

	container
		.bind(DI_SYMBOLS.IReadManyTodoUseCase)
		.toClass(ReadManyTodoUseCase, [DI_SYMBOLS.ITodoRepository]);

	container
		.bind(DI_SYMBOLS.IReadTodoController)
		.toClass(ReadTodoController, [DI_SYMBOLS.IReadTodoUseCase, DI_SYMBOLS.IReadManyTodoUseCase]);

	container
		.bind(DI_SYMBOLS.IUpdateTodoController)
		.toClass(UpdateTodoController, [DI_SYMBOLS.IUpdateTodoUseCase, DI_SYMBOLS.IReadTodoUseCase]);

	container
		.bind(DI_SYMBOLS.IUpdateTodoUseCase)
		.toClass(UpdateTodoUseCase, [DI_SYMBOLS.ITodoRepository]);

	container
		.bind(DI_SYMBOLS.IDeleteTodoController)
		.toClass(DeleteTodoController, [DI_SYMBOLS.IDeleteTodoUseCase]);

	container
		.bind(DI_SYMBOLS.IDeleteTodoUseCase)
		.toClass(DeleteTodoUseCase, [DI_SYMBOLS.ITodoRepository]);
}
