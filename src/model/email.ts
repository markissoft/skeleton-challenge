import { ValueObject } from "../model/core/domain/ValueObject";
import { Result } from "../model/core/logic/Result";
import { Guard } from "../model/core/logic/Guard";
import { IEmail } from "../model/interfaces";

export class Email extends ValueObject<IEmail> {
	get value(): string {
		return this.props.value;
	}

	private constructor(props: IEmail) {
		super(props);
	}

	public static create(email: string): Result<Email> {
		const guardResult = Guard.againstNullOrUndefined(email, "email");
		if (!guardResult.succeeded) {
			return Result.fail<Email>(guardResult.message);
		} else {
			return Result.ok<Email>(new Email({ value: email }));
		}
	}
}
