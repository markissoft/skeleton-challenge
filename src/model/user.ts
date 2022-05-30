import { AggregateRoot } from "../model/core/domain/AggregateRoot";
import { UniqueEntityID } from "../model/core/domain/UniqueEntityID";
import { Result } from "../model/core/logic/Result";
import { UserId } from "./userId";
import { Email } from "./email";
import { Guard } from "../model/core/logic/Guard";
import { Password } from "./password";
import { IEmail, IPassword } from "../model/interfaces";

export interface IUser {
	firstName: string;
	lastName: string;
	email: Email;
	password: string;
}

export class User extends AggregateRoot<IUser> {
	get id(): UniqueEntityID {
		return this._id;
	}

	get firstName(): string {
		return this.props.firstName;
	}

	get lastName(): string {
		return this.props.lastName;
	}

	get email(): Email {
		return this.props.email;
	}

	get password(): string {
		return this.props.password;
	}

	private constructor(props: IUser, id?: UniqueEntityID) {
		super(props, id);
	}

	public static create(props: IUser, id?: UniqueEntityID): Result<User> {
		const guardedProps = [
			{ argument: props.firstName, argumentName: "firstName" },
			{ argument: props.lastName, argumentName: "lastName" },
			{ argument: props.email, argumentName: "email" },
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<User>(guardResult.message);
		} else {
			const user = new User(props, id);
			return Result.ok<User>(user);
		}
	}
}
