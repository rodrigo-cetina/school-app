import { IGroup } from "./group";
import { IStudent } from "./student";

export interface IGroupStudent {
    id: number;
    group: IGroup;
    student: IStudent;
}