import { User } from "../user";
import { UserMap } from "../mappers/userMap";
import { IRepo, Repo } from "../core/infrastructure/Repo";
import { DynamoDBClient, dynamodb } from "../infrastructure/dynamodb";
import { Email, Password } from "..";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export interface IUserRepo extends IRepo<User> {
	getAllUsers(): Promise<User[]>;
	//getUserByEmail(email: string): Promise<IUser>;
	getUserById(id: string): Promise<User | null>;
	//getUserByUsername(username: string): Promise<IUser>;
	removeUserById(id: string): Promise<boolean>;
	upsert(exists: boolean, user: User): Promise<void>;
}

export class UserRepository extends Repo<User> implements IUserRepo {
	private rootCollection = "users";

	constructor(private db: DynamoDBClient) {
		super();
	}

	async getAllUsers(): Promise<User[]> {
		const params = {
			TableName: this.rootCollection,
		};

		const persistanceItems = await this.db.scan(params).promise();

		console.log(persistanceItems.Items);

		if (!persistanceItems.Items) {
			return [];
		} else {
			console.log(persistanceItems.Items.map((p) => UserMap.toDomain(p)));
			return persistanceItems.Items.map((p) => UserMap.toDomain(p));
		}
	}

	async getUserById(id: string): Promise<User | null> {
		const params = {
			TableName: this.rootCollection,
			Key: { id: id },
		};

		const persistanceItem = await this.db.get(params).promise();

		if (!persistanceItem.Item) return null;
		return UserMap.toDomain(persistanceItem.Item);
	}

	async upsert(exists: boolean, user: User): Promise<void> {
		const persistanceItem = UserMap.toPersistence(user);

		const params = {
			TableName: this.rootCollection,
			Item: persistanceItem,
		};

		const res = await this.db.put(params).promise();
	}

	async removeUserById(id: string): Promise<boolean> {
		const params = {
			TableName: this.rootCollection,
			Key: { id },
		};

		const res = await this.db.delete(params).promise();

		return !!res;
	}

	async exists(email: string): Promise<boolean> {
		// const params = {
		// 	TableName: this.rootCollection,
		// 	IndexName: "user_email",
		// 	KeyConditions: {
		// 		user_email: email,
		// 	},
		// 	Key: {
		// 		user_email: email,
		// 	},
		// };

		// const persistanceItem = await this.db.query(params).promise();

		// console.log("ddd: ", persistanceItem);

		return true /*!!persistanceItem.Item*/;
	}
}

export const userRepo = new UserRepository(dynamodb);

console.log(userRepo.exists("markiproki123@gmail.com"));
