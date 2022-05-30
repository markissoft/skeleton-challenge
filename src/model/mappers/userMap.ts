import { Mapper } from "../core/infrastructure/Mapper";
import { User, Email, Password } from "../index";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { IUser } from "../user";

class UserMapper extends Mapper<User> {
	toPersistence(user: User): any {
		return {
			id: user.id.toValue().toString(),
			user_first_name: user.firstName,
			user_last_name: user.lastName,
			user_email: user.email.value,
			user_password: user.password,
		};
	}

	toDTO(user: User) {
		return {
			id: user.id.toValue().toString(),
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email.value,
			password: user.password,
		};
	}

	toDomain(raw: any): User {
		const userEmailOrError = Email.create(raw.user_email);
		//const userPasswordOrError = Password.create({ value: raw.user_password });

		const userOrError = User.create(
			{
				firstName: raw.user_first_name,
				lastName: raw.user_last_name,
				email: userEmailOrError.getValue(),
				password: raw.user_password,
			},
			new UniqueEntityID(raw.id)
		);

		userOrError.isFailure ? console.log(userOrError.error) : "";

		return userOrError.isSuccess
			? userOrError.getValue()
			: userOrError.errorValue();
	}
}

export const UserMap = new UserMapper();
