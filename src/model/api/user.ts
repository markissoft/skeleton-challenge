import * as express from "express";
import { createUserController, getUserByIdController } from "../useCases";

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/", (req, res) => {
	createUserController.execute(req, res);
});

userRouter.get("/:id", (req, res) => {
	getUserByIdController.execute(req, res);
});

export { userRouter };
