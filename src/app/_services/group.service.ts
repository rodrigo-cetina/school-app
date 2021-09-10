import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { IGroup } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<IGroup[]>(`${environment.apiUrl}/group`);
    }

    getByTeacherId (id: number) {
        return this.http.get<IGroup[]>(`${environment.apiUrl}/group/teacher/${id}`);
    }

    getById (id: number) {
        return this.http.get<IGroup>(`${environment.apiUrl}/group/${id}`);
    }

    add (group) {
        return this.http.post<IGroup>(`${environment.apiUrl}/group`, group)
            .pipe(map(group => {
                return group;
            }));
    }

    update (group) {
        return this.http.put<IGroup>(`${environment.apiUrl}/group`, group)
            .pipe(map(group => {
                return group;
            }));
    }

    deleteById (id: number) {
        return this.http.delete<number>(`${environment.apiUrl}/group/${id}`);
    }
}