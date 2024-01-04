import { TimestampedDocument } from "./models"

export interface IUser extends TimestampedDocument {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}