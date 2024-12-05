export class DomainError extends Error {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class ApplicationError extends Error {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
	}
}
export class AuthenticationError extends ApplicationError {}
export class AlreadyExists extends ApplicationError {
	constructor(entity: string, identifier: string | number, context?: Record<string, unknown>) {
		super(`Entity "${entity}" with the identifier "${identifier}" already EXISTS.`, {
			entity,
			identifier,
			...context
		});
	}
}
export class NotFound extends ApplicationError {
	constructor(entity: string, identifier: string | number, context?: Record<string, unknown>) {
		super(`Entity "${entity}" with the identifier "${identifier}" does NOT EXIST.`, {
			entity,
			identifier,
			...context
		});
	}
}

export class InterfaceAdapterError extends Error {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
	}
}
export class InvalidSignupToken extends InterfaceAdapterError {}

export class PresentationError extends Error {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class InfrastructureError extends Error {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
	}
}
export class DatabaseError extends InfrastructureError {}
