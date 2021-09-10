import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { IScoreRecord } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScoreRecordService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<IScoreRecord[]>(`${environment.apiUrl}/scoreRecord`);
    }

    getByStudentId (id) {
        return this.http.get<IScoreRecord[]>(`${environment.apiUrl}/scoreRecord/student/${id}`);
    }

    getByGroupId (id) {
        return this.http.get<IScoreRecord[]>(`${environment.apiUrl}/scoreRecord/group/${id}`);
    }

    getById (id: number) {
        return this.http.get<IScoreRecord>(`${environment.apiUrl}/scoreRecord/${id}`);
    }

    register (scoreRecords) {
        return this.http.post(`${environment.apiUrl}/scoreRecord/register`, scoreRecords)
            .pipe(map(() => {
                return true
            }));
    }

    add (scoreRecord: IScoreRecord) {
        return this.http.post<IScoreRecord>(`${environment.apiUrl}/scoreRecord`, scoreRecord)
            .pipe(map(scoreRecord => {
                return scoreRecord;
            }));
    }

    update (scoreRecord: IScoreRecord) {
        return this.http.put<IScoreRecord>(`${environment.apiUrl}/scoreRecord`, scoreRecord)
            .pipe(map(scoreRecord => {
                return scoreRecord;
            }));
    }

    deleteById (id: number) {
        return this.http.delete<number>(`${environment.apiUrl}/scoreRecord/${id}`);
    }
}