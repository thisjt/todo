export class Todo {
	public id: number;
	public title: string;
	public details: string;
	public completed: boolean;
	public userId: number;

	constructor(todo: ReturnType<Todo['getData']>) {
		this.id = todo.id;
		this.title = todo.title;
		this.details = todo.details;
		this.completed = todo.completed;
		this.userId = todo.userId;
	}

	updateData(todo: Partial<ReturnType<Todo['getData']>>) {
		this.title = todo.title !== undefined ? todo.title : this.title;
		this.details = todo.details !== undefined ? todo.details : this.details;
		this.completed = todo.completed !== undefined ? todo.completed : this.completed;
	}

	getData() {
		return {
			id: this.id,
			title: this.title,
			details: this.details,
			completed: this.completed,
			userId: this.userId
		};
	}
}
