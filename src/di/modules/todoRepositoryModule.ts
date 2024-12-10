import type { Container } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { TodoRepository } from '$src/infrastructure/repositories/Todo';

export function registerTodoRepositoryModule(container: Container) {
	container.bind(DI_SYMBOLS.ITodoRepository).toClass(TodoRepository, [DI_SYMBOLS.Context]);
}
