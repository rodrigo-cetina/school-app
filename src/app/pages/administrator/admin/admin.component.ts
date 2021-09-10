import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { IAdministrator } from '@app/_models';
import { AdministratorService } from '@app/_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    administrators: IAdministrator[] = [];

    constructor(private administratorService: AdministratorService) { }

    ngOnInit () {
        this.loading = true;
        this.administratorService.getAll().pipe(first()).subscribe(administrators => {
            console.log('administrators', administrators);

            this.loading = false;
            this.administrators = administrators;
        });
    }
}