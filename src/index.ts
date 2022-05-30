import express from "express";
import { userRouter } from "./model/api/user";

const app = express();

app.use("/api/v1/user", userRouter);

app.listen(5000, () =>
	console.log(" [+] Server started on port 5000", app.listeners)
);
