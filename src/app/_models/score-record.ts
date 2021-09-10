import { IGroup } from "./group";
import { IStudent } from "./student";

export interface IScoreRecord {
    id: number;
    score: number;
    student: IStudent;
    group: IGroup;
}