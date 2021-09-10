import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, IStudent } from '@app/_models';
import { Gender } from '@app/_models/gender';
import { StudentService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit {
  isNewForm: boolean = false;
  dataForm: FormGroup;
  loadingData = true;
  loading = false;
  submitted = false;
  error = '';
  loadingDelete = false;
  errorDeleted = '';
  students: IStudent[] = [];
  currentStudent: IStudent;
  gender: Gender;
  
  constructor(
    private formBuilder: FormBuilder, 
    private studentService: StudentService,
    private modalService: NgbModal
  ) { 
    
  }

  ngOnInit(): void {
    this.studentService.getAll().pipe(first()).subscribe(students => {
      this.students = students;
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
    this.f['role'].setValue(Role.Student);
    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  onEdit(contentModal, student: IStudent) {
    this.submitted = false;
    this.isNewForm = false;
    this.loading = false;
    this.error = '';
    this.f['id'].setValue(student.person.id);
    this.f['code'].setValue(student.code);
    this.f['firstName'].setValue(student.person.firstName);
    this.f['lastName'].setValue(student.person.lastName);
    this.f['gender'].setValue(student.person.gender);
    this.f['pictureUrl'].setValue(student.person.pictureUrl);
    this.f['role'].setValue(student.person.role);
    this.f['email'].setValue(student.person.email);

    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  onDelete(contentModalDelete, student: IStudent) {
    this.loadingDelete = false;
    this.currentStudent = student;
    this.modalService.open(contentModalDelete, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      if (result) {
        this.loadingDelete = true;
        this.studentService.deleteById(student.person.id).subscribe(id => {
          this.students = this.students.filter(i => i.person.id != id);
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

      var student: IStudent = {
        code: this.f.code.value,
        person: {
          id: this.f.id.value,
          firstName: this.f.firstName.value,
          lastName: this.f.lastName.value,
          gender: this.f.gender.value,
          pictureUrl: this.f.pictureUrl.value,
          role: Role.Student,
          email: this.f.email.value
        }
      };
      
      this.loading = true;
      if (this.isNewForm) {
        this.studentService.add(student).subscribe(student => {
          modal.dismiss();
          this.students.push(student);
        }, error => {
          this.error = error;
          this.loading = false;
        });
      } else {
        this.studentService.update(student).subscribe(student => {
          modal.dismiss();
          const index = this.students.findIndex(i => i.person.id === student.person.id);
          if (index !== -1)
          {
            this.students.splice(index, 1, student);
          }
        }, error => {
          this.error = error;
          this.loading = false;
        });
      }
    }

}
