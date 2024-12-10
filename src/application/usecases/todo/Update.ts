import type { ITodoRepository } from '$src/application/repositories/Todo';
import { Todo } from '$src/domain/Todo';

export class UpdateTodoUseCase {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(todo: ReturnType<Todo['getData']>) {
		const todoDomain = new Todo(todo);
		const updatedTodo = await this.todoRepository.update(todoDomain);
		return updatedTodo;
	}
}
