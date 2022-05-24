import { AggregateRoot } from "@domain/AggregateRoot";
import { UniqueEntityID } from "@domain/UniqueEntityID";
import { Result } from "@logic/Result";
import { UserId } from "./userId";
import { Email } from "./email";
import { Guard } from "@logic/Guard";
import { Password } from "./password";
import { IUser, IEmail, IPassword } from "@interfaces";

export class User extends AggregateRoot<IUser> {
	get id(): UniqueEntityID {
		return this._id;
	}

	get userId(): UserId {
		return UserId.caller(this.id);
	}

	get firstName(): string {
		return this.props.firstName;
	}

	get lastName(): string {
		return this.props.lastName;
	}

	get email(): IEmail {
		return this.props.email;
	}

	get password(): IPassword {
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
