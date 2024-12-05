import type { ITodoRepository } from '$src/application/repositories/Todo';
import { NotFound } from '$src/domain/Errors';

export class ReadTodoUseCase {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(id: number) {
		const todo = await this.todoRepository.find(id);
		if (!todo) throw new NotFound('Todo Entry Does Not Exist');
		return todo;
	}
}
