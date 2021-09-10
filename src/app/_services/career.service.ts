import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { ICareer } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CareerService {
    constructor(private http: HttpClient) { }

    getAll () {
        return this.http.get<ICareer[]>(`${environment.apiUrl}/career`);
    }

    getById (id: number) {
        return this.http.get<ICareer>(`${environment.apiUrl}/career/${id}`);
    }

    add (career: ICareer) {
        return this.http.post<ICareer>(`${environment.apiUrl}/career`, career)
            .pipe(map(career => {
                return career;
            }));
    }

    update (career: ICareer) {
        return this.http.put<ICareer>(`${environment.apiUrl}/career`, career)
            .pipe(map(career => {
                return career;
            }));
    }

    deleteById (id: number) {
        return this.http.delete<number>(`${environment.apiUrl}/career/${id}`);
    }
}