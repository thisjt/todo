import type { Todo } from '$src/domain/Todo';

export interface ITodoRepository {
	create(todo: Todo): Promise<Todo>;
	find(id: number): Promise<Todo | null>;
	findFromUsers(userId: number): Promise<Todo[]>;
	update(todo: Todo): Promise<Todo>;
	delete(id: number): Promise<void>;
}
