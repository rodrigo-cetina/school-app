import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Administrator } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AdministratorService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<Administrator[]>(`${environment.apiUrl}/administrator`);
    }

    getById (id: number) {
        return this.http.get<Administrator>(`${environment.apiUrl}/administrator/${id}`);
    }
}