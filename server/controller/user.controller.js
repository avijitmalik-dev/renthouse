import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
/**
 * GET ALL USER LIST
 * @param {*} req 
 * @param {*} res 
 */

export const getUsers = async (req, res) => {
    try {
        const data = await prisma.user.findMany(); 
        console.log(data);
        res.status(200).json({ success: true, message: 'success', data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message || 'Failed to get users!', data: null });
    }
}


/**
 * FIND THE USER WITH ID WISE
 * @param {*} req 
 * @param {*} res 
 */
export const getUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await prisma.user.findUnique({
            where: { id }
        });
        res.status(200).send({ success: true, message: 'success', data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message || 'Failed to get user!', data: null });
    }
}

/**
 * GET UPDATE USER
 * @param {*} req 
 * @param {*} res 
 */
export const updateUser = async(req, res)=>{
    const id = req.params.id;
    const userTokenId = req.userId;
    console.log(id, userTokenId );
    const { password, avatar , ...inputs} = req.body;
    if(id !== userTokenId){
        return res.status(403).send({ success: false, message: "You are not authorized to update this user", data : null});
    }
    try {
        let updatePassword = null;
        if(password){
            updatePassword = await bcrypt.hash(password, 10);
        }
        const data = await prisma.user.update({
            where : { id },
            data: {
                ...inputs,
                ...(updatePassword && { password : updatePassword }),
                ...(avatar && { avatar })

            }
        }); 
        res.status(200).send({ success: true, message: 'User updated successfully', data: data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message || 'Failed to Update user!', data: null });
    }
}

/**
 * DELETE THE USER
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const userTokenId = req.userId;
        if(id !== userTokenId){
            return res.status(403).send({ success : false, message : "You are not authorized!", data : null});
        }
        const data = await prisma.user.delete({
            where : { id }
        })
            res.status(200).send({ success: true, message: 'Users delete successfully', data: data            
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message || 'Failed to Delete user!', data: null });
    }
}