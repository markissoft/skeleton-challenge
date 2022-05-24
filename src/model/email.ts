import { ValueObject } from "@domain/ValueObject";
import { Result } from "@logic/Result";
import { Guard } from "@logic/Guard";
import { IEmail } from "@interfaces";

export class Email extends ValueObject<IEmail> {
	get value(): string {
		return this.props.value;
	}

	private constructor(props: IEmail) {
		super(props);
	}

	public static create(email: string): Result<IEmail> {
		const guardResult = Guard.againstNullOrUndefined(email, "email");
		if (!guardResult.succeeded) {
			return Result.fail<Email>(guardResult.message);
		} else {
			return Result.ok<Email>(new Email({ value: email }));
		}
	}
}
