import { BaseController } from "../../core/infrastructure/BaseController";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { GetUserByIdErrors } from "./GetUserByIdErrors";
import { GetUserByIdDTO } from "./GetUserByIdDTO";
import { UserMap } from "../../mappers/userMap";

export class GetUserByIdController extends BaseController {
	private useCase: GetUserByIdUseCase;

	constructor(useCase: GetUserByIdUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(): Promise<any> {
		const dto: GetUserByIdDTO = this.req.params as unknown as GetUserByIdDTO;

		try {
			const result = await this.useCase.execute(dto);

			return this.res.send(UserMap.toDTO(result.value.getValue()));
		} catch (err) {
			return this.fail(err as Error);
		}
	}
}
