//Controllers
import { CreateUserController } from "./createUser/CreateUserController";
import { GetUserByIdController } from "./getUserById/GetUserByIdController";

//UseCases
import { CreateUserUseCase } from "./createUser/CreateUserUseCase";
import { GetUserByIdUseCase } from "./getUserById/GetUserByIdUseCase";

//Repositories
import { userRepo } from "../repositories/userRepo";

const createUserController = new CreateUserController(
	new CreateUserUseCase(userRepo)
);

const getUserByIdController = new GetUserByIdController(
	new GetUserByIdUseCase(userRepo)
);

export { createUserController, getUserByIdController };
