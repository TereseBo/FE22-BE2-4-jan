import { findByEmail } from "../helpers/user";
import User from "../models/user";
import { Request, Response } from "express";
import { IUser } from "../types/user";
interface LoginBody extends ReadableStream {
    email: string;
    password: string;
}

interface RegisterBody extends LoginBody, ReadableStream {
    firstName: string;
    lastName: string;
}



const getUserProfile = async (req: Request, res: Response) => {

        console.log(req.body.email)
        try {
    
            const user = await findByEmail("bob@mail.se");
            res.status(200).json({ 
                user/* : user.toJSON() */
                
                
            });
        }
        catch (err: any) {
            res.status(404).json({ message: "User not found"});
        }

}

export {getUserProfile}