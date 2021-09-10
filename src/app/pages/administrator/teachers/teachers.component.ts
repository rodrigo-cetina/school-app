import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, ITeacher } from '@app/_models';
import { Gender } from '@app/_models/gender';
import { TeacherService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.less']
})
export class TeachersComponent implements OnInit {
  isNewForm: boolean = false;
  dataForm: FormGroup;
  loadingData = true;
  loading = false;
  submitted = false;
  error = '';
  loadingDelete = false;
  errorDeleted = '';
  teachers: ITeacher[] = [];
  currentTeacher: ITeacher;
  gender: Gender;
  
  constructor(
    private formBuilder: FormBuilder, 
    private teacherService: TeacherService,
    private modalService: NgbModal
  ) { 
    
  }

  ngOnInit(): void {
    this.teacherService.getAll().pipe(first()).subscribe(teachers => {
      this.teachers = teachers;
      this.loadingData = false
    });

    this.dataForm = this.formBuilder.group({
        id: ['', Validators.required],
        code: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        pictureUrl: [''],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
    });
  }

  onCreate(contentModal) {
    this.submitted = false;
    this.isNewForm = true;
    this.loading = false;
    this.error = '';
    this.dataForm.reset();
    this.f['id'].setValue(0);
    this.f['role'].setValue(Role.Teacher);
    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  onEdit(contentModal, teacher: ITeacher) {
    this.submitted = false;
    this.isNewForm = false;
    this.loading = false;
    this.error = '';
    this.f['id'].setValue(teacher.person.id);
    this.f['code'].setValue(teacher.code);
    this.f['firstName'].setValue(teacher.person.firstName);
    this.f['lastName'].setValue(teacher.person.lastName);
    this.f['gender'].setValue(teacher.person.gender);
    this.f['pictureUrl'].setValue(teacher.person.pictureUrl);
    this.f['role'].setValue(teacher.person.role);
    this.f['email'].setValue(teacher.person.email);

    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  onDelete(contentModalDelete, teacher: ITeacher) {
    this.loadingDelete = false;
    this.currentTeacher = teacher;
    this.modalService.open(contentModalDelete, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      if (result) {
        this.loadingDelete = true;
        this.teacherService.deleteById(teacher.person.id).subscribe(id => {
          this.teachers = this.teachers.filter(i => i.person.id != id);
        }, error => {
          this.loadingDelete = false;
        });
      }
    }, (reason) => {
      
    });
  }

  // convenience getter for easy access to form fields
    get f () { return this.dataForm.controls; }

    onSubmit (modal) {
      this.submitted = true;

      if (this.dataForm.invalid) {
        return;
      }

      var teacher: ITeacher = {
        code: this.f.code.value,
        person: {
          id: this.f.id.value,
          firstName: this.f.firstName.value,
          lastName: this.f.lastName.value,
          gender: this.f.gender.value,
          pictureUrl: this.f.pictureUrl.value,
          role: Role.Teacher,
          email: this.f.email.value
        }
      };
      
      this.loading = true;
      if (this.isNewForm) {
        this.teacherService.add(teacher).subscribe(teacher => {
          modal.dismiss();
          this.teachers.push(teacher);
        }, error => {
          this.error = error;
          this.loading = false;
        });
      } else {
        this.teacherService.update(teacher).subscribe(teacher => {
          modal.dismiss();
          const index = this.teachers.findIndex(i => i.person.id === teacher.person.id);
          if (index !== -1)
          {
            this.teachers.splice(index, 1, teacher);
          }
        }, error => {
          this.error = error;
          this.loading = false;
        });
      }
    }

}
