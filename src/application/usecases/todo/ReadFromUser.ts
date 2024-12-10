import type { ITodoRepository } from '$src/application/repositories/Todo';

export class ReadManyTodoUseCase {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(userId: number) {
		const todo = await this.todoRepository.findFromUsers(userId);
		return todo;
	}
}

export type IReadManyTodoUseCase = typeof ReadManyTodoUseCase.prototype;
