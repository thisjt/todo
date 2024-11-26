export class DomainError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = this.constructor.name;
	}
}

export class ApplicationError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = this.constructor.name;
	}
}
export class AuthenticationError extends ApplicationError {}
export class UserAlreadyExists extends ApplicationError {}

export class InterfaceAdapterError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = this.constructor.name;
	}
}
export class InvalidSignupToken extends InterfaceAdapterError {}

export class PresentationError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = this.constructor.name;
	}
}

export class InfrastructureError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = this.constructor.name;
	}
}
export class DatabaseError extends InfrastructureError {}
