import type { OAHonoContext } from '$lib/types';

import type { IAuthenticationService } from '$src/application/services/AuthenticationService';

import type { IUsersRepository } from '$src/application/repositories/Users';

import type { ILoginUseCase } from '$src/application/usecases/authentication/Login';
import type { ISignUpUseCase } from '$src/application/usecases/authentication/SignUp';

import type { ILoginController } from '$src/interface-adapter/controller/auth/Login';
import type { ISignUpController } from '$src/interface-adapter/controller/auth/SignUp';
import type { ICreateTodoController } from '$src/interface-adapter/controller/todo/Create';
import type { IDeleteTodoController } from '$src/interface-adapter/controller/todo/Delete';
import type { IReadTodoController } from '$src/interface-adapter/controller/todo/Read';
import type { IUpdateTodoController } from '$src/interface-adapter/controller/todo/Update';
import type { ICreateTodoUseCase } from '$src/application/usecases/todo/Create';
import type { IDeleteTodoUseCase } from '$src/application/usecases/todo/Delete';
import type { IReadTodoUseCase } from '$src/application/usecases/todo/Read';
import type { IReadManyTodoUseCase } from '$src/application/usecases/todo/ReadFromUser';
import type { IUpdateTodoUseCase } from '$src/application/usecases/todo/Update';
import type { ITodoRepository } from '$src/application/repositories/Todo';

export const DI_SYMBOLS = {
	Context: Symbol.for('Context'),

	IAuthenticationService: Symbol.for('IAuthenticationService'),

	IUsersRepository: Symbol.for('IUsersRepository'),

	ILoginUseCase: Symbol.for('ILoginUseCase'),
	ISignUpUseCase: Symbol.for('ISignUpUseCase'),

	ILoginController: Symbol.for('ILoginController'),
	ISignUpController: Symbol.for('ISignUpController'),

	ITodoRepository: Symbol.for('ITodoRepository'),

	ICreateTodoController: Symbol.for('ICreateTodoController'),
	IDeleteTodoController: Symbol.for('IDeleteTodoController'),
	IReadTodoController: Symbol.for('IReadTodoController'),
	IUpdateTodoController: Symbol.for('IUpdateTodoController'),

	ICreateTodoUseCase: Symbol.for('ICreateTodoUseCase'),
	IDeleteTodoUseCase: Symbol.for('IDeleteTodoUseCase'),
	IReadTodoUseCase: Symbol.for('IReadTodoUseCase'),
	IReadFromUserTodoUseCase: Symbol.for('IReadFromUserTodoUseCase'),
	IUpdateTodoUseCase: Symbol.for('IUpdateTodoUseCase')
};

export interface DI_RETURN_TYPES {
	Context: OAHonoContext;

	IAuthenticationService: IAuthenticationService;

	IUsersRepository: IUsersRepository;

	ILoginUseCase: ILoginUseCase;
	ISignUpUseCase: ISignUpUseCase;

	ILoginController: ILoginController;
	ISignUpController: ISignUpController;

	ITodoRepository: ITodoRepository;

	ICreateTodoController: ICreateTodoController;
	IDeleteTodoController: IDeleteTodoController;
	IReadTodoController: IReadTodoController;
	IUpdateTodoController: IUpdateTodoController;

	ICreateTodoUseCase: ICreateTodoUseCase;
	IDeleteTodoUseCase: IDeleteTodoUseCase;
	IReadTodoUseCase: IReadTodoUseCase;
	IReadManyTodoUseCase: IReadManyTodoUseCase;
	IUpdateTodoUseCase: IUpdateTodoUseCase;
}
