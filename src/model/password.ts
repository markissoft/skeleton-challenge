import { ValueObject } from "@domain/ValueObject";
import { Result } from "@logic/Result";
import { Guard } from "@logic/Guard";
import { IPassword } from "@interfaces";
import * as bcrypt from "bcrypt-nodejs";

export class Password extends ValueObject<IPassword> {
	get value(): string {
		return this.props.value;
	}

	private constructor(props: IPassword) {
		super(props);
	}

	/**
	 * @method comparePassword
	 * @desc Compares as plain-text and hashed password.
	 */

	public async comparePassword(plainTextPassword: string): Promise<boolean> {
		let hashed: string;
		if (this.isAlreadyHashed()) {
			hashed = this.props.value;
			return this.bcryptCompare(plainTextPassword, hashed);
		} else {
			return this.props.value === plainTextPassword;
		}
	}

	private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			bcrypt.compare(plainText, hashed, (err, compareResult) => {
				if (err) return resolve(false);
				return resolve(compareResult);
			});
		});
	}

	public isAlreadyHashed(): boolean {
		return !!this.props.hashed;
	}

	private hashPassword(password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			//TODO: change to bcrypt.genSaltSync
			bcrypt.hash(password, "null", null, (err, hash) => {
				if (err) return reject(err);
				resolve(hash);
			});
		});
	}

	public getHashedValue(): Promise<string> {
		return new Promise((resolve) => {
			if (this.isAlreadyHashed()) {
				return resolve(this.props.value);
			} else {
				return resolve(this.hashPassword(this.props.value));
			}
		});
	}

	public static isAppropriateLength(value: string): boolean {
		return value.length >= 8;
	}

	public static create(props: IPassword): Result<Password> {
		const propsResult = Guard.againstNullOrUndefined(props.value, "password");

		if (!propsResult.succeeded) {
			return Result.fail<Password>(propsResult.message);
		} else {
			if (!props.hashed) {
				if (!this.isAppropriateLength(props.value)) {
					return Result.fail<Password>(
						"Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min]."
					);
				}
			}

			return Result.ok<Password>(
				new Password({
					value: props.value,
					hashed: !!props.hashed === true,
				})
			);
		}
	}
}
