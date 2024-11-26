import type { ITodoRepository } from '$src/application/repositories/Todo';
import type { Todo } from '$src/domain/Todo';

export class UpdateTodoUseCase {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(todo: Todo) {
		const updatedTodo = await this.todoRepository.update(todo);
		return updatedTodo;
	}
}
