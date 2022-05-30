import { UseCase } from "../../core/domain/UseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { Either, Result, left, right } from "../../core/logic/Result";
import { Email } from "../../email";
import { Password } from "../../password";
import { User } from "../../user";
import { IUserRepo } from "../../repositories/userRepo";
import { CreateUserErrors } from "./CreateUserErrors";
import { GenericAppError } from "../../core/logic/AppError";

type Response = Either<
	| GenericAppError.UnexpectedError
	| CreateUserErrors.AccountAlreadyExists
	| Result<any>,
	Result<void>
>;

export class CreateUserUseCase
	implements UseCase<CreateUserDTO, Promise<Response>>
{
	private userRepo: IUserRepo;

	constructor(userRepo: IUserRepo) {
		this.userRepo = userRepo;
	}

	async execute(req: CreateUserDTO): Promise<Response> {
		const { firstName, lastName } = req;

		const emailOrError = Email.create(req.email);
		const passwordOrError = Password.create({ value: req.password });

		const combinedPropsResult = Result.combine([emailOrError, passwordOrError]);

		if (combinedPropsResult.isFailure) {
			return left(Result.fail<void>(combinedPropsResult.error)) as Response;
		}

		console.log(await passwordOrError.getValue().getHashedValue());

		const userOrError = User.create({
			email: emailOrError.getValue(),
			password: await passwordOrError.getValue().getHashedValue(),
			firstName,
			lastName,
		});

		if (userOrError.isFailure) {
			return left(Result.fail<void>(combinedPropsResult.error)) as Response;
		}

		const user: User = userOrError.getValue();

		const userAlreadyExists = /*await this.userRepo.exists(user.email);*/ false;

		if (userAlreadyExists) {
			return left(
				new CreateUserErrors.AccountAlreadyExists(user.email.value)
			) as Response;
		}

		try {
			await this.userRepo.upsert(userAlreadyExists, user);
		} catch (err) {
			return left(new GenericAppError.UnexpectedError(err)) as Response;
		}

		return right(Result.ok<void>()) as Response;
	}
}
