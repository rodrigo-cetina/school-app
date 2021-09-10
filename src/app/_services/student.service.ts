import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { IStudent } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<IStudent[]>(`${environment.apiUrl}/student`);
    }

    getById (id: number) {
        return this.http.get<IStudent>(`${environment.apiUrl}/student/${id}`);
    }

    add (student: IStudent) {
        return this.http.post<IStudent>(`${environment.apiUrl}/student`, student)
            .pipe(map(student => {
                return student;
            }));
    }

    update (student: IStudent) {
        return this.http.put<IStudent>(`${environment.apiUrl}/student`, student)
            .pipe(map(student => {
                return student;
            }));
    }

    deleteById (id: number) {
        return this.http.delete<number>(`${environment.apiUrl}/person/${id}`);
    }
}