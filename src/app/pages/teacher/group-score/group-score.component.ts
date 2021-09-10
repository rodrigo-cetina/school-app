import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup, IScoreRecord } from '@app/_models';
import { GroupService, ScoreRecordService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-group-score',
  templateUrl: './group-score.component.html',
  styleUrls: ['./group-score.component.less']
})
export class GroupScoreComponent implements OnInit {
  currentGroupId: number;
  loading = false;
  loadingData = true;
  error = '';
  success = '';
  groupCode = '';
  subjectTitle = '';
  scoreRecords: IScoreRecord[] = [];
  dataForm: FormGroup;

  constructor(
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private groupService: GroupService,
    private scoreRecordService: ScoreRecordService,
    private formBuilder: FormBuilder
  ) {
    this.router.events.subscribe((val) => {
      const id: string = this.activateRoute.snapshot.paramMap.get('id') || '0';
      this.onLoadGroupScoreRecords(id);
    });
  }

  get array(): FormArray {
    return this.dataForm.get('records') as FormArray;
  }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      records: this.formBuilder.array([])
    });
  }

  onLoadGroupScoreRecords(id) {
    this.success = '';
    this.error = ''
    if (id === this.currentGroupId) return;
    this.currentGroupId = id;

    this.loadingData = true;
    
    this.groupService.getById(this.currentGroupId).pipe(first()).subscribe(group => {
      this.groupCode = group.code;
      this.subjectTitle = group.subject.title;
    });

    this.scoreRecordService.getByGroupId(this.currentGroupId).pipe(first()).subscribe(scoreRecords => {
      this.scoreRecords = scoreRecords;
      this.loadingData = false;

      this.dataForm = this.formBuilder.group({
      records: this.formBuilder.array(this.scoresArray)
    });
    });
  }

  get scoresArray(){
    
    let array = [];
    
    for(let i = 0;i <this.scoreRecords.length;i++){
      array.push(
        
        this.formBuilder.group({
          groupid: [this.scoreRecords[i].group.id],
          studentid: [this.scoreRecords[i].student.person.id],
          firstName: [this.scoreRecords[i].student.person.firstName],
          lastName: [this.scoreRecords[i].student.person.lastName],
          score: [this.scoreRecords[i].score != 0 ? this.scoreRecords[i].score : null]
        })

      );
    }
    
    return array;
  }

  onSave() {
    this.success = '';
    this.error = ''
    var records = [];
    for(let i = 0;i <this.array.length;i++){
      var record = {
        groupId: this.array.controls[i].get('groupid').value,
        studentId: this.array.controls[i].get('studentid').value,
        score: this.array.controls[i].get('score').value ?? 0
      };
      records.push(record);
    }

    console.log(records);
    this.loading = true;
      this.scoreRecordService.register(records).subscribe(() => {
        this.loading = false;
        this.success = 'Scores saved';
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }

}
