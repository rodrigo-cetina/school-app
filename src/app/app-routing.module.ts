import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home';
import { AdminComponent } from './pages/administrator/admin';
import { LoginComponent } from './pages/login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { StudentScoreComponent } from './pages/student/student-score/student-score.component';
import { GroupScoreComponent } from './pages/teacher/group-score/group-score.component';
import { TeachersComponent } from './pages/administrator/teachers/teachers.component';
import { StudentsComponent } from './pages/administrator/students/students.component';
import { SubjectsComponent } from './pages/administrator/subjects/subjects.component';
import { GroupsComponent } from './pages/administrator/groups/groups.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Administrator] }
    },
    {
        path: 'teachers',
        component: TeachersComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Administrator] }
    },
    {
        path: 'students',
        component: StudentsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Administrator] }
    },
    {
        path: 'subjects',
        component: SubjectsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Administrator] }
    },
    {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Administrator] }
    },
    {
        path: 'student-score',
        component: StudentScoreComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Student] }
    },
    {
        path: 'group-score/:id',
        component: GroupScoreComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Teacher] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
