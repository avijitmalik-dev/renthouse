import  express  from 'express';
const authRouter = express.Router();
import { login, logout, register } from '../controller/auth.controller.js';
// import { authenticate } from '../middleware/middleware.js';



authRouter.post("/register", register)
authRouter.post("/login",  login)
authRouter.post("/logout", logout)


export default authRouter;