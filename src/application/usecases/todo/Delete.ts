import type { ITodoRepository } from '$src/application/repositories/Todo';

export class DeleteTodoUseCase {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(id: number) {
		await this.todoRepository.delete(id);
	}
}

export type IDeleteTodoUseCase = typeof DeleteTodoUseCase.prototype;
