import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from "../add-question/add-question.component";
import * as _ from "lodash";
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  questionData: any = [];
  questionForm!: FormGroup;

  constructor(public dialog: MatDialog,
    private formbuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.getData();
    this.createForm();
    if (this.questionData.length) {
      this.addOption();
      // this.editForm();
    }
  }

  createForm() {
    this.questionForm = this.formbuilder.group({
      questionArray: this.formbuilder.array([])
    });
  }

  // editForm(){
  //   var i=0;
  //   while(i<=this.questionData.length-1){
  //     if(this.questionData[i].questionType === "paragraph")
  //     ((this.questionForm.get("questionArray") as FormArray).at(i) as FormGroup).get('paragraph')?.patchValue("paragraph");
  //   }
  // }

  getData() {
    let data = localStorage.getItem('data');
    let parseData :any= data ? JSON.parse(data) : [];
    this.questionData = parseData.length || parseData.questionData ? [parseData.questionData] : [];
  }

  noOfOptions(): FormArray {
    return this.questionForm.get("questionArray") as FormArray;
  }

  newOption(): FormGroup {
    return this.formbuilder.group({
      option: new FormArray([])
    });
  }

  addOption(): void {
    this.noOfOptions().push(this.newOption());
    this.addMenus();
  }

  addMenus() {
    let optionArr = this.getOptionArr(this.questionData.length - 1);
    _.map(optionArr, itr => {
      let optionControl = (this.questionForm.get('questionArray') as FormArray).controls;
      let optionFormArray = optionControl[this.questionData.length - 1].get('option') as FormArray;
      optionFormArray.push(new FormControl(false))
    })
  }

  newParagraph(): FormGroup {
    return this.formbuilder.group({
      paragraph: new FormControl("", Validators.required)
    });
  }

  addParagraph(): void {
    this.noOfOptions().push(this.newParagraph());
  }

  addNewQuestion() {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      height: '400px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(this.questionData)
      this.questionData.push(result.data);
      if (result.data.questionType === "checkbox") {
        this.addOption();
      } else {
        this.addParagraph();
      }
    });
  }

  getQtnType(i: number) {
    return this.questionData ? this.questionData[i]?.questionType : null;
  }

  getOptionArr(i: number) {
    return this.questionData ? this.questionData[i]?.optionArray : null;
  }

  getQuestion(indx: number) {
    return this.questionData ? this.questionData[indx]?.question : null;
  }

  getOptionName(i: number, j: number) {
    return this.questionData[i].optionArray[j].option;
  }

  optionsFormArray(i: number) {
    let optionControl = (this.questionForm.get('questionArray') as FormArray).controls;
    let optionFormArray = optionControl[i].get('option') as FormArray;
    return optionFormArray.controls;
  }

  onSubmit() {
    let obj = {
      questionData : this.questionData,
      answerData : this.questionForm.value
    }
    console.log(obj)
    localStorage.setItem('data', JSON.stringify(obj));
    this.router.navigate(['/form/answers'], { queryParams: { data: JSON.stringify(obj) } });
  }

}
