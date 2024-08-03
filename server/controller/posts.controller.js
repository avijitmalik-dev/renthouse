import prisma from '../lib/prisma.js';


/**
 * GET ALL POSTS
 * @param {*} req 
 * @param {*} res 
 */
export const getPosts = async(req, res) =>{
    const query = req.query;
    try {
        const resp = await prisma.post.findMany({
            where:{
                city: query.city || undefined,
                type: query.type || undefined,
                property : query.property || undefined,
                bedroom : parseInt(query.bedroom) || undefined,
                price:{
                    gte : parseInt(query.minPrice) || 0,
                    lte : parseInt(query.maxPrice)|| 100000000000
                }  
            }
        });
        console.log("Get all the data list", resp);
        res.status(200).send({ message :`ok`, data:resp, success:true})
    } catch (error) {
        console.error(error);
        res.status(500).send({ message :`Internal System ${error}`, data:null, success:false})
    }
}

/**
 * GET ONLY POST
 * @param {*} req 
 * @param {*} res 
 */
export const getPost = async (req, res) => {
    try {
      const id = req.params.id;
      const resp = await prisma.post.findUnique({
        where: { id },
        include: {
          postDetails: true, 
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      });
      console.log("show id wise data list ", resp);
      res.status(200).send({ message: `ok`, data: resp, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: `Internal System ${error}`, data: null, success: false });
    }
};
  


/**
 * @ADD NEW POSTS
 * @param {*} req 
 * @param {*} res 
 */
export const addnewPosts = async (req, res) => {  
    try {
        const body = req.body;
        const tokenUserId = req.userId;
        const data = {
            ...body.Post,
            userId : tokenUserId,
            postDetails:{
                create : body.postDetail
            } 
        }
        const resp = await prisma.post.create({ data });
        console.log(resp);
        res.status(200).send({ message: "ok", data: resp, success: true });
    } catch (error) {
        console.error("Error creating new post:", error);
        res.status(500).send({ message: `Faild to create new post: ${error.message}`, data: null, success: false });
    }
};


/**
 * @UPDATE NEW POST
 * @param {*} req 
 * @param {*} res 
 */
export const updatePosts = async(req, res) =>{
    try {
        const userTokenId = req.userId;
        const body = req.body;
        const id = req.params.id;
        const data = await prisma.post.findUnique({
            where : { id }
        })
        if(!id){ return res.status(403).send({message:"Update Id Not Provided!", data: null, success : flase})}
        if(data.userId != userTokenId){ return res.status(403).send({message : "You Are Not Authorized To This Update Data", data: null, success: false})}
        const resp = await prisma.post.update({
            where : { id },
            data : {
                ...body.postdata,
                postDetails : body.postDetail ? {
                    update : body.postDetail 
                } : undefined
            }
        });
        console.log("hello auth you get update data :",  body, userTokenId);
        res.status(200).send({ message :`ok`, data:resp, success:true})
    } catch (error) {
        console.error(error);
        res.status(500).send({ message :`Faild to update posts ${error}`, data:null, success:false})
    }
}

/**
 * @DELETE THE POSTS
 * @param {*} req 
 * @param {*} res 
 */
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const tokenUserId = req.userId;
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });
        if (!post) {
            return res.status(404).send({ message: "Post not found", success: false });
        }
        if (post.userId !== tokenUserId) {
            return res.status(403).send({ message: "You are not authorized to delete this post", success: false });
        }
        const resp = await prisma.post.delete({
            where: { id: postId }
        });
        console.log(resp);
        res.status(200).send({ message: "Post successfully deleted", data: resp, success: true });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send({ message: `Internal System Error: ${error.message}`, data: null, success: false });
    }
};
