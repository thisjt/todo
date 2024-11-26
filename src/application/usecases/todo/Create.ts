import type { ITodoRepository } from '$src/application/repositories/Todo';
import { Todo } from '$src/domain/Todo';

export class CreateTodoUseCase {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(todoData: Omit<ReturnType<Todo['getData']>, 'id'>) {
		const todo = await this.todoRepository.create(
			new Todo({
				...todoData,
				...{ id: 0 }
			})
		);

		return todo;
	}
}
