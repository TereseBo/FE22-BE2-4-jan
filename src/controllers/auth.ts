import { comparePassword, findByEmail, generateAuthToken, userToJSON } from "../helpers/user";
import User from "../models/user";
import { Request, Response } from "express";

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
        } = req.body as RegisterBody;
        if(!email || !password || !firstName || !lastName) {
            throw new Error('All fields are required');
            // Alternativt, utan try/catch använd return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.create({ 
            email, 
            password,
            firstName,
            lastName
        })
        const token = generateAuthToken(user);
        res.status(201).json({ 
            user: userToJSON(user), 
            token 
        });
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginBody;
        if(!email || !password) {
            throw new Error('All fields are required');
        }
        const user = await findByEmail(email);
        if(!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = generateAuthToken(user);
        res.status(201).json({ 
            user: userToJSON(user), 
            token 
        });
    }
    catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export {
    registerUser,
    loginUser
};