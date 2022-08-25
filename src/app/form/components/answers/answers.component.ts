import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  finalData: any;
  constructor(private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((params) =>{
      this.finalData = params.getAll('data')
      this.finalData = JSON.parse(this.finalData)
      
    });
  }

  getParagraph(i : number){
      let response = this.finalData.answerData.questionArray[i].paragraph;
      return response;
  }

  getSelectedOption(i : number){
    var response = ""
    let arrData = this.finalData.answerData.questionArray[i].option;
    _.map(arrData,(itr,indx)=>{
      if(itr){
        response += this.finalData.questionData[i].optionArray[indx].option;
      }
      response += " \n"
    })
    return response;
  }

}
