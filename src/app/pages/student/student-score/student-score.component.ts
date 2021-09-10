import { Component, OnInit } from '@angular/core';
import { IScoreRecord, IUser } from '@app/_models';
import { AuthenticationService, ScoreRecordService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrls: ['./student-score.component.less']
})
export class StudentScoreComponent implements OnInit {
  loadingData = true;
  scoreRecords: IScoreRecord[] = [];
  user: IUser;

  constructor(private authenticationService: AuthenticationService, private scoreRecordService: ScoreRecordService) {
    this.user = this.authenticationService.userValue;
   }

  ngOnInit(): void {
    this.scoreRecordService.getByStudentId(this.user.id).pipe(first()).subscribe(scoreRecords => {
      console.log(scoreRecords);
      
      this.scoreRecords = scoreRecords;
      this.loadingData = false
    });
  }

}
