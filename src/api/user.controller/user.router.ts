import Router from "express";

import {
  createUser,
  getAllUsers,
  login,
  getOneUser,
  updateRoles,
  getAllByRole,
} from "./user.repository";

const userRouter = Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/roles").get(getAllUsers);
userRouter.route("/state").post(updateRoles);
userRouter.route("/roles/:role").get(getAllByRole);
userRouter.route("/:userId").get(getOneUser);

export default userRouter;
