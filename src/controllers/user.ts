import { Response } from "express";

import { UserRequest } from "../types/auth";
import User from "../models/user";


export const getUserProfile = async (req: UserRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId);
        
        if(!user) {
            throw new Error()
        }
        res.status(200).json({
            user
        })
    }
    catch (err) {
        res.status(404).json({
            message: "User not found"
        })
    }
}

