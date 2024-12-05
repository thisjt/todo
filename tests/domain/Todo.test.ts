import { expect, describe, it } from 'vitest';

import { Todo } from '$src/domain/Todo';

describe('todo entity domain', () => {
	const todoMockData = {
		id: 11,
		title: 'todo',
		details: 'todo details',
		completed: false,
		userId: 3
	};

	const modifiedMockData = {
		id: 9,
		title: 'todo modified',
		details: 'todo details modified',
		completed: true,
		userId: 4
	};

	describe('constructor', () => {
		const todo = new Todo(todoMockData);

		it('should create a todo entity with all the properties', () => {
			expect(todo.id).toBe(todoMockData.id);
			expect(todo.title).toBe(todoMockData.title);
			expect(todo.details).toBe(todoMockData.details);
			expect(todo.completed).toBe(todoMockData.completed);
			expect(todo.userId).toBe(todoMockData.userId);
		});
	});

	describe('functions', () => {
		it('should return all values', () => {
			const todo = new Todo(todoMockData);
			expect(todo.getData()).toEqual(todoMockData);
		});

		it('should update only updatable values', () => {
			const todo = new Todo(todoMockData);

			todo.updateData(modifiedMockData);
			todo.updateData({});

			expect(todo.getData()).toEqual({
				...modifiedMockData,
				id: todoMockData.id,
				userId: todoMockData.userId
			});
		});
	});
});
