import {  TimestampedDocument } from "./models";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
}