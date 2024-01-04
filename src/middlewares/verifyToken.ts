import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserRequest } from '../types/auth';

export const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if(!token) {
        token = req.headers['x-access-token']?.toString();
    }
    if(!token) {
        token = req.cookies.token;
    }
    if(!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }
    token = token.split(' ')[1];

    const secret = process.env.JWT_SECRET || 'secret';

    const onVerify = (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded._id;
        next();
    }
    
    jwt.verify(token, secret, onVerify);

}