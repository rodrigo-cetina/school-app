import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { IUser } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: IUser;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.userValue;
    }

    ngOnInit () {
        
    }
}