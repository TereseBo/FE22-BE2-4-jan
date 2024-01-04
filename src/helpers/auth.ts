import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/user";
import { IUser } from '../types/user';

export const generateAuthToken = function(user: IUser) {
    const secret = process.env.JWT_SECRET || 'secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    const token = jwt.sign({ _id: user._id }, secret, { expiresIn });
    return token;
}

export const generatePasswordHash = async function(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err) {
        throw new Error(err as any);
    }
}

export const comparePassword = async function(password: string, hash: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        if(!isMatch) {
            throw new Error("Invalid credentials")
        }
        return isMatch;
    }
    catch (err) {
        throw new Error(err as any);
    }
}

export const findByEmail = async function(email: string) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (err) {
        throw new Error(err as any);
    }
}

export const findByToken = async function(token: string) {
    try {
        const secret = process.env.JWT_SECRET || 'secret';
        const decoded = jwt.verify(token, secret) as { _id: string };
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (err) {
        throw new Error(err as any);
    }
}

export const userToJSON = function(user: IUser) {
    const { _id, firstName, lastName, email } = user;
    return { _id, firstName, lastName, email };
}