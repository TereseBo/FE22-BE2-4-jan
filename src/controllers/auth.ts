import { Request, Response } from "express";

import User from "../models/user";
import { comparePassword, findByEmail, generateAuthToken } from "../helpers/auth";

interface LoginBody extends ReadableStream {
    email: string;
    password: string;
}

interface RegisterBody extends LoginBody, ReadableStream {
    firstName: string;
    lastName: string;
}

const registerUser = async (req: Request, res: Response) => {
    try {

        const {
            email,
            password,
            firstName,
            lastName  
        } = req.body as RegisterBody
        
        if(!email || !password || !firstName || !lastName) {
            throw new Error("Please fill in all fields")
        }

        const user = await User.create({
            email,
            password,
            firstName,
            lastName
        })
        const token = generateAuthToken(user);
        res.status(201).json({ 
            user: user.toJSON(), 
            token 
        });
    }
    catch(err: any) {
        res.status(400).json({
            message: err.message
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try{

        const {
            email,
            password
        } = req.body as LoginBody
        
        if(!email || !password){
            throw new Error("Please fill in all fields")
        }
        const user = await findByEmail(email)
        await comparePassword(password, user.password)

        const token = generateAuthToken(user);
        res.status(200).json({
            user,
            token
        })
    }
    catch(err: any){
        res.status(400).json({
            message: err.message
        })
    }

}

export {
    registerUser,
    loginUser
}
