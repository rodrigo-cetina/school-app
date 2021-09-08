import { Role } from "./role";

export class Administrator {
    person: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: Role;
    }
}