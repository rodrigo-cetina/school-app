import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ISubject } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SubjectService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<ISubject[]>(`${environment.apiUrl}/subject`);
    }

    getById (id: number) {
        return this.http.get<ISubject>(`${environment.apiUrl}/subject/${id}`);
    }

    add (subject: ISubject) {
        return this.http.post<ISubject>(`${environment.apiUrl}/subject`, subject)
            .pipe(map(subject => {
                return subject;
            }));
    }

    update (subject: ISubject) {
        return this.http.put<ISubject>(`${environment.apiUrl}/subject`, subject)
            .pipe(map(subject => {
                return subject;
            }));
    }

    deleteById (id: number) {
        return this.http.delete<number>(`${environment.apiUrl}/subject/${id}`);
    }
}