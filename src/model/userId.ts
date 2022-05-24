import { Entity } from "@domain/Entity";
import { UniqueEntityID } from "@domain/UniqueEntityID";

export class UserId extends Entity<any> {
	get id(): UniqueEntityID {
		return this._id;
	}

	private constructor(id?: UniqueEntityID) {
		super(null, id);
	}
}
