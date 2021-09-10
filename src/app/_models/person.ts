import { Role } from "./role";
import { Gender } from "./gender";

export interface IPerson {
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    pictureUrl: string;
    role: Role;
    email: string;
}