export class DatabaseError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export class NotFoundError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export class UnauthorizedError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}
