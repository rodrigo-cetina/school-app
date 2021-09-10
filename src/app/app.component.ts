import { Component } from '@angular/core';

import { AuthenticationService, GroupService } from './_services';
import { IGroup, IUser, Role } from './_models';
import { first } from 'rxjs/operators';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: IUser;
    groups: IGroup[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private groupService: GroupService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    ngOnInit(): void {
        if (this.isTeacher) {
            this.groupService.getByTeacherId(this.user.id).pipe(first()).subscribe(groups => {
                this.groups = groups;
            });
        }
    }

    get isAdmin () {
        return this.user && this.user.role === Role.Administrator;
    }

    get isTeacher () {
        return this.user && this.user.role === Role.Teacher;
    }

    get isStudent () {
        return this.user && this.user.role === Role.Student;
    }

    logout () {
        this.authenticationService.logout();
    }
}