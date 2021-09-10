import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISubject } from '@app/_models';
import { SubjectService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.less']
})
export class SubjectsComponent implements OnInit {
  isNewForm: boolean = false;
  dataForm: FormGroup;
  loadingData = true;
  loading = false;
  submitted = false;
  error = '';
  loadingDelete = false;
  errorDeleted = '';
  subjects: ISubject[] = [];
  currentSubject: ISubject;
  
  constructor(
    private formBuilder: FormBuilder, 
    private subjectService: SubjectService,
    private modalService: NgbModal
  ) { 
    
  }

  ngOnInit(): void {
    this.subjectService.getAll().pipe(first()).subscribe(subjects => {
      this.subjects = subjects;
      this.loadingData = false
    });

    this.dataForm = this.formBuilder.group({
        id: ['', Validators.required],
        title: ['', Validators.required]
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

  onEdit(contentModal, subject: ISubject) {
    this.submitted = false;
    this.isNewForm = false;
    this.loading = false;
    this.error = '';
    this.f['id'].setValue(subject.id);
    this.f['title'].setValue(subject.title);
    
    this.modalService.open(contentModal, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }

  onDelete(contentModalDelete, subject: ISubject) {
    this.loadingDelete = false;
    this.currentSubject = subject;
    this.modalService.open(contentModalDelete, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      if (result) {
        this.loadingDelete = true;
        this.subjectService.deleteById(subject.id).subscribe(id => {
          this.subjects = this.subjects.filter(i => i.id != id);
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

      var subject: ISubject = {
        id: this.f.id.value,
        title: this.f.title.value
      };
      
      this.loading = true;
      if (this.isNewForm) {
        this.subjectService.add(subject).subscribe(subject => {
          modal.dismiss();
          this.subjects.push(subject);
        }, error => {
          this.error = error;
          this.loading = false;
        });
      } else {
        this.subjectService.update(subject).subscribe(subject => {
          modal.dismiss();
          const index = this.subjects.findIndex(i => i.id === subject.id);
          if (index !== -1)
          {
            this.subjects.splice(index, 1, subject);
          }
        }, error => {
          this.error = error;
          this.loading = false;
        });
      }
    }

}
