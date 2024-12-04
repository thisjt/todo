import type { ITodoRepository } from '$src/application/repositories/Todo';
import type { Todo } from '$src/domain/Todo';

export class UpdateTodoUseCase {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(todo: ReturnType<Todo['getData']>) {
		const updatedTodo = await this.todoRepository.update(todo);
		return updatedTodo;
	}
}
