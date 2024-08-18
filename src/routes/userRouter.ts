import { Router } from "express";
import {
  getUsers,
  createUser,
  createUserForm,
  getUser,
} from "../controllers/userController";
import { deleteUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/all", getUsers);
userRouter.get("/create", createUserForm);
userRouter.post("/create", createUser);
userRouter.delete("/delete/:id", deleteUser);
// generic routes like this should come last, if above /create it will override the route
userRouter.get("/:id", getUser);

export default userRouter;
