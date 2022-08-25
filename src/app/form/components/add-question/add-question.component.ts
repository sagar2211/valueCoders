import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as _ from "lodash";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  selectedType = "checkbox";
  optionArrayControl: any = [];
  constructor(private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddQuestionComponent>,) { }

  ngOnInit(): void {
    this.createForm();
    this.addOption();
    this.optionArrayControl = (this.questionForm.get('optionArray') as FormArray).controls;
    let optioncontrol = this.optionArrayControl[0].get('option') as FormControl;
    optioncontrol.setValidators(this.selectedType === "checkbox" ? Validators.required : null);
    optioncontrol.updateValueAndValidity();
  }

  createForm() {
    this.questionForm = this.formbuilder.group({
      questionType: new FormControl("checkbox", Validators.required),
      question: new FormControl("", Validators.required),
      optionArray: this.formbuilder.array([])
    });
  }


  questionTypeChange(event: any) {
    this.selectedType = event.value;
    this.optionArrayControl = (this.questionForm.get('optionArray') as FormArray).controls;
    _.map(this.optionArrayControl, (itr, i) => {
      let optioncontrol = this.optionArrayControl[i].get('option') as FormControl;
      optioncontrol.setValidators(this.selectedType === "checkbox" ? Validators.required : null);
      optioncontrol.updateValueAndValidity();
    })
  }

  getcontrolfun(i: number) {
    return this.optionArrayControl[i].get('option') as FormControl
  }

  noOfOptions(): FormArray {
    return this.questionForm.get("optionArray") as FormArray;
  }

  newOption(): FormGroup {
    return this.formbuilder.group({
      option: new FormControl(""),
    });
  }

  addOption(): void {
    this.noOfOptions().push(this.newOption());
    this.optionArrayControl = (this.questionForm.get('optionArray') as FormArray).controls;
  }

  onSubmit() {
    this.dialogRef.close({ data: this.questionForm.value });
  }
}
