import { IPassword } from "./IPassword";
import { IEmail } from "./IEmail";

export interface IUser {
	userId: string;
	firstName: string;
	lastName: string;
	email: IEmail;
	password: IPassword;
}
