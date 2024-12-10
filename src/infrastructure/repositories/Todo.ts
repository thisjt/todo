import type { ITodoRepository } from '$src/application/repositories/Todo';
import type { OAHonoContext } from '$lib/types';
import { Todo } from '$src/domain/Todo';

export class TodoRepository implements ITodoRepository {
	constructor(private _context: OAHonoContext) {}

	async create(todo: Todo) {
		const todoData = await this._context.var.prisma.todo.create({
			data: todo.getData(),
			select: {
				id: true,
				title: true,
				details: true,
				completed: true,
				userId: true
			}
		});

		return new Todo({
			...todoData,
			details: todoData.details || ''
		});
	}

	async find(id: number) {
		const todoData = await this._context.var.prisma.todo.findFirst({
			select: {
				id: true,
				title: true,
				details: true,
				completed: true,
				userId: true
			},
			where: {
				id
			}
		});

		if (!todoData) return null;

		return new Todo({
			...todoData,
			details: todoData.details || ''
		});
	}

	async findFromUsers(userId: number) {
		const todoData = await this._context.var.prisma.todo.findMany({
			select: {
				id: true,
				title: true,
				details: true,
				completed: true,
				userId: true
			},
			where: {
				userId
			}
		});

		const todoDataArray = todoData.map((todoData) => {
			return new Todo({
				...todoData,
				details: todoData.details || ''
			});
		});

		return todoDataArray;
	}

	async update(todo: Todo) {
		const todoData = await this._context.var.prisma.todo.update({
			select: {
				id: true,
				title: true,
				details: true,
				completed: true,
				userId: true
			},
			data: {
				title: todo.title,
				details: todo.details,
				completed: todo.completed
			},
			where: {
				id: todo.id
			}
		});

		return new Todo({
			...todoData,
			details: todoData.details || ''
		});
	}

	async delete(id: number) {
		await this._context.var.prisma.todo.delete({
			where: {
				id
			}
		});
	}
}
