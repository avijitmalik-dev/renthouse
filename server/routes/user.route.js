import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.controller.js";

const userRoute  = express.Router();

userRoute.get("/", getUsers);
userRoute.get("/:id", verifyToken, getUser);
userRoute.put("/:id", verifyToken, updateUser);
userRoute.delete("/:id", verifyToken, deleteUser);

export default userRoute;
