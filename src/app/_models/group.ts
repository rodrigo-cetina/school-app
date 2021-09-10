import { ICareer } from "./career";
import { ISubject } from "./subject";
import { ITeacher } from "./teacher";

export interface IGroup {
    id: number;
    code: string;
    career: ICareer;
    subject: ISubject;
    teacher: ITeacher;
}