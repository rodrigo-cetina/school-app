import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './pages/home';
import { AdminComponent } from './pages/administrator/admin';
import { LoginComponent } from './pages/login';;
import { StudentScoreComponent } from './pages/student/student-score/student-score.component'
import { GroupScoreComponent } from './pages/teacher/group-score/group-score.component'
import { TeachersComponent } from './pages/administrator/teachers/teachers.component'
import { StudentsComponent } from './pages/administrator/students/students.component'
import { SubjectsComponent } from './pages/administrator/subjects/subjects.component'
import { GroupsComponent } from './pages/administrator/groups/groups.component'
;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
,
        NgbModule    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        StudentScoreComponent,
        GroupScoreComponent,
        TeachersComponent,
        StudentsComponent,
        SubjectsComponent,
        GroupsComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }