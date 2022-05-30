import { UseCaseError } from "../../core/logic/UseCaseError";
import { Result } from "../../core/logic/Result";

export namespace GetUserByIdErrors {
	export class NoDataFoud extends Result<UseCaseError> {
		constructor(id: string) {
			super(false, {
				message: `No data found for id: ${id}`,
			} as UseCaseError);
		}
	}
}
