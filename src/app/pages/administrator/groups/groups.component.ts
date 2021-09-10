import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICareer, IGroup, IGroupStudent, IStudent, ISubject, ITeacher } from '@app/_models';
import { CareerService, GroupService, GroupStudentService, StudentService, SubjectService, TeacherService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupsComponent implements OnInit {
  isNewForm: boolean = false;
  dataForm: FormGroup;
  loadingData = true;
  loading = false;
  submitted = false;
  error = '';
  loadingDelete = false;
  errorDeleted = '';
  groups: IGroup[] = [];
  currentGroup: IGroup;
  careers: ICareer[] = [];
  subjects: ISubject[] = [];
  teachers: ITeacher[] = [];
  dataFormStudent: FormGroup;
  loadingDataStudent = true;
  loadingStudent = false;
  submittedStudent = false;
  errorStudent = '';
  students: IStudent[] = [];
  groupStudents: IGroupStudent[] = [];
  currentGroupStudent: IGroupStudent;
  loadingDeleteStudent = false;
  errorDeletedStudent = '';
  
  constructor(
    private formBuilder: FormBuilder, 
    private groupService: GroupService,
    private careerService: CareerService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private groupStudentService: GroupStudentService,
    private modalService: NgbModal
  ) { 
    
  }

  ngOnInit(): void {
    this.careerService.getAll().pipe(first()).subscribe(careers => {
      this.careers = careers;
    });

    this.subjectService.getAll().pipe(first()).subscribe(subjects => {
      this.subjects = subjects;
    });

    this.teacherService.getAll().pipe(first()).subscribe(teachers => {
      this.teachers = teachers;
    });

    this.studentService.getAll().pipe(first()).subscribe(students => {
      this.students = students;
    });

    this.groupService.getAll().pipe(first()).subscribe(groups => {
      this.groups = groups;
      this.loadingData = false
    });

    this.dataForm = this.formBuilder.group({
        id: ['', Validators.required],
        careerid: ['', Validators.required],
        subjectid: ['', Validators.required],
        code: ['', Validators.required],
        teacherid: ['', Validators.required]
    });

    this.dataFormStudent = this.formBuilder.group({
        id: ['', Validators.required],
        groupid: ['', Validators.required],
        studentid: ['', Validators.required]
    });
  }

  onCreate(contentModal) {
    this.submitted = false;
    this.isNewForm = true;
    this.loading = false;
    this.error = '';
    this.dataForm.reset();
    this.f['id'].setValue(0);
    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  onEdit(contentModal, group: IGroup) {
    this.submitted = false;
    this.isNewForm = false;
    this.loading = false;
    this.error = '';
    this.f['id'].setValue(group.id);
    this.f['careerid'].setValue(group.career.id);
    this.f['subjectid'].setValue(group.subject.id);
    this.f['code'].setValue(group.code);
    this.f['teacherid'].setValue(group.teacher.person.id);

    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  onDelete(contentModalDelete, group: IGroup) {
    this.loadingDelete = false;
    this.currentGroup = group;
    this.modalService.open(contentModalDelete, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      if (result) {
        this.loadingDelete = true;
        this.groupService.deleteById(group.id).subscribe(id => {
          this.groups = this.groups.filter(i => i.id != id);
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

      var group = {
        id: this.f.id.value,
        careerid: this.f.careerid.value,
        code: this.f.code.value,
        subjectid: this.f.subjectid.value,
        teacherid: this.f.teacherid.value
      };
      
      this.loading = true;
      if (this.isNewForm) {
        this.groupService.add(group).subscribe(group => {
          modal.dismiss();
          this.groups.push(group);
        }, error => {
          this.error = error;
          this.loading = false;
        });
      } else {
        this.groupService.update(group).subscribe(group => {
          modal.dismiss();
          const index = this.groups.findIndex(i => i.id === group.id);
          if (index !== -1)
          {
            this.groups.splice(index, 1, group);
          }
        }, error => {
          this.error = error;
          this.loading = false;
        });
      }
    }

    onViewStudents(contentModalStudent, group: IGroup) {
      
      this.currentGroup = group;
      this.submittedStudent = false;
      this.loadingStudent = false;
      this.errorStudent = '';
      this.dataFormStudent.reset();
      this.fs['id'].setValue(0);
      this.fs['groupid'].setValue(group.id);
      
      this.loadingDataStudent = true;
      
      this.groupStudentService.getByGroupId(group.id).pipe(first()).subscribe(groupsStudents => {
        this.groupStudents = groupsStudents;
        this.loadingDataStudent = false
      });


      this.modalService.open(contentModalStudent, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
        
      }, (reason) => {
        
      });
  }

  get fs () { return this.dataFormStudent.controls; }

  onSubmitStudent() {
    this.submittedStudent = true;

    if (this.dataFormStudent.invalid) {
      return;
    }

    var groupStudent = {
      id: 0,
      groupid: this.fs.groupid.value,
      studentid: this.fs.studentid.value
    };
    
    this.loadingStudent = true;
    this.groupStudentService.add(groupStudent).subscribe(groupStudents => {
        this.groupStudents.push(groupStudents);
        this.submittedStudent = false;
        this.loadingStudent = false;
        this.fs['studentid'].setValue(null);
      }, error => {
        this.errorStudent = error;
        this.loadingStudent = false;
      });
  }

  onDeleteStudent(contentModalDeleteStudent, groupStudent: IGroupStudent) {
    this.loadingDeleteStudent = false;
    this.currentGroupStudent = groupStudent;
    this.modalService.open(contentModalDeleteStudent, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      if (result) {
        this.loadingDeleteStudent = true;
        this.groupStudentService.deleteById(groupStudent.id).subscribe(id => {
          this.groupStudents = this.groupStudents.filter(i => i.id != id);
        }, error => {
          this.loadingDeleteStudent = false;
        });
      }
    }, (reason) => {
      
    });
  }

}
