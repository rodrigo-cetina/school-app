import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { IGroupStudent } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupStudentService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<IGroupStudent[]>(`${environment.apiUrl}/groupStudent`);
    }

    getById (id: number) {
        return this.http.get<IGroupStudent>(`${environment.apiUrl}/groupStudent/${id}`);
    }

    getByGroupId (id: number) {
        return this.http.get<IGroupStudent[]>(`${environment.apiUrl}/groupStudent/group/${id}`);
    }

    add (groupStudent) {
        return this.http.post<IGroupStudent>(`${environment.apiUrl}/groupStudent`, groupStudent)
            .pipe(map(groupStudent => {
                return groupStudent;
            }));
    }

    deleteById (id: number) {
        return this.http.delete<number>(`${environment.apiUrl}/groupStudent/${id}`);
    }
}