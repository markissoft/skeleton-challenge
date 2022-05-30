import { UseCase } from "../../core/domain/UseCase";
import { Either, Result, left, right } from "../../core/logic/Result";
import { Email } from "../../email";
import { Password } from "../../password";
import { User } from "../../user";
import { IUserRepo } from "../../repositories/userRepo";
import { GenericAppError } from "../../core/logic/AppError";
import { GetUserByIdDTO } from "./GetUserByIdDTO";
import { GetUserByIdErrors } from "./GetUserByIdErrors";

type Response = Either<
	GenericAppError.UnexpectedError | GetUserByIdErrors.NoDataFoud | Result<any>,
	Result<void>
>;

export class GetUserByIdUseCase
	implements UseCase<GetUserByIdDTO, Promise<Response>>
{
	private userRepo: IUserRepo;

	constructor(userRepo: IUserRepo) {
		this.userRepo = userRepo;
	}

	async execute(req: GetUserByIdDTO): Promise<Response> {
		const { id } = req;

		let res: User | null;
		try {
			res = await this.userRepo.getUserById(id);
		} catch (err) {
			return left(new GenericAppError.UnexpectedError(err)) as Response;
		}

		if (res) {
			return right(Result.ok<User>(res)) as unknown as Response;
		}

		return left(new GetUserByIdErrors.NoDataFoud(id)) as Response;
	}
}
