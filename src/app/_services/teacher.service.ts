import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ITeacher } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeacherService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<ITeacher[]>(`${environment.apiUrl}/teacher`);
    }

    getById (id: number) {
        return this.http.get<ITeacher>(`${environment.apiUrl}/teacher/${id}`);
    }

    add (teacher: ITeacher) {
        return this.http.post<ITeacher>(`${environment.apiUrl}/teacher`, teacher)
            .pipe(map(teacher => {
                return teacher;
            }));
    }

    update (teacher: ITeacher) {
        return this.http.put<ITeacher>(`${environment.apiUrl}/teacher`, teacher)
            .pipe(map(teacher => {
                return teacher;
            }));
    }

    deleteById (id: number) {
        return this.http.delete<number>(`${environment.apiUrl}/person/${id}`);
    }
}