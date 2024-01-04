import { Request, Response } from "express";

import User from "../models/user";
import { generateAuthToken } from "../helpers/auth";

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

export {
    registerUser
}
