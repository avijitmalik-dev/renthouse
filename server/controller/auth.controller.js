import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';


/**
 * register a new user
 * @param {*} req 
 * @param {*} res 
 */

export const register = async(req, res) =>{
    try {
        //req db operation;
        const {email, name, password} = req.body;
        //HASH THE PASSWORD
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        //CREATE NEW USER AND SAVE DB
        const newUser = await prisma.user.create({
            data:{
                email, 
                name, 
                password:hashPassword
            }
        })
        // Log the new user and send response
        console.log(newUser);
        res.status(201).json({
            data:newUser
        });
    }catch(e) {
        console.error(e);
        res.status(500).json({error:"Internal Server Error..!"})
    }
}

/**
 * login a new user
 * @param {} req 
 * @param {*} res 
 */
export const login = async(req, res) =>{
   try {
    const {email, password} = req.body;
    //CHECK IF THE USE EXITS
    const user = await prisma.user.findUnique({
        where: { email }
    });

    //CHECK IF THE PASSWOD IS CORRECT

    if(!user) return res.status(401).json({ message : "Invalid Email Address!"});
    const isPasswordVaild = await bcrypt.compare(password, user.password);
    if(!isPasswordVaild) return res.status(401).json({ message : " Invalid Password!"});

    //GENERATE COOKIE TOKEN AND SEND TO THE USER
    const age = '3d';
    // const ageExp = "1h"
    const token = await jwt.sign({
        id: user.id,
        isAdmin: false,
    }, process.env.JWT_SECRET_KEY, { expiresIn : age });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ success: true, message: "Login success", data: user });

    console.log(`Cookie set: ${res.getHeader('Set-Cookie')}`);
   } catch (error) {
        const errObj = new Error(error);
        res.status(500).send({
            success: false,
            message: error.message || "Login Faild!",
            data: null
        })
    }
}

/**
 * logout the new user
 * @param {*} req 
 * @param {*} res 
 */
export const logout = async(req, res) =>{
    try {
        res.clearCookie('token').status(201).json({ message : "Logged Out Successfully " })
    } catch (error) {
        console.error("Error during logout ", error);
        res.status(500).json({ message : "Internal Server Error.!"})
    }finally{
        await prisma.$disconnect()
    }
}