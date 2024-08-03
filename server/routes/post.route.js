import  express  from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import { addnewPosts, deletePost, getPost, getPosts, updatePosts } from '../controller/posts.controller.js';
const postRouter  = express.Router();



postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", verifyToken, addnewPosts);
postRouter.put("/:id", verifyToken, updatePosts);
postRouter.delete("/:id", verifyToken, deletePost);


export default postRouter;
