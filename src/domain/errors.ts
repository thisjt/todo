class ErrorEntity extends Error {
	private _code = 0;
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
	get code() {
		return this._code;
	}
	set code(num) {
		this._code += num;
	}
}

export class DomainError extends ErrorEntity {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.code = 1000;
		this.name = this.constructor.name;
	}
}

export class ApplicationError extends ErrorEntity {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.code = 2000;
		this.name = this.constructor.name;
	}
}

export class AuthenticationError extends ApplicationError {
	constructor(identifier: string | number, context?: Record<string, unknown>) {
		super(`User "${identifier}" failed authentication.`, {
			identifier,
			...context
		});
		this.code = 1;
	}
}
export class AlreadyExists extends ApplicationError {
	constructor(entity: string, identifier: string | number, context?: Record<string, unknown>) {
		super(`Entity "${entity}" with the identifier "${identifier}" already EXISTS.`, {
			entity,
			identifier,
			...context
		});
		this.code = 2;
	}
}
export class NotFound extends ApplicationError {
	constructor(entity: string, identifier: string | number, context?: Record<string, unknown>) {
		super(`Entity "${entity}" with the identifier "${identifier}" does NOT EXIST.`, {
			entity,
			identifier,
			...context
		});
		this.code = 3;
	}
}

export class InterfaceAdapterError extends ErrorEntity {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.code = 3000;
		this.name = this.constructor.name;
	}
}
export class InvalidSignupToken extends InterfaceAdapterError {}

export class PresentationError extends ErrorEntity {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.code = 4000;
		this.name = this.constructor.name;
	}
}

export class InfrastructureError extends ErrorEntity {
	constructor(
		message: string,
		public readonly context?: Record<string, unknown>
	) {
		super(message);
		this.code = 5000;
		this.name = this.constructor.name;
	}
}
export class DatabaseError extends InfrastructureError {}
