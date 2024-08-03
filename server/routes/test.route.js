import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controller/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const testRouter = express.Router();


testRouter.get("/should-be-logged-in",verifyToken, shouldBeLoggedIn);
testRouter.get("/should-be-admin", shouldBeAdmin);


export default testRouter;

