import { Component, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Input() config;
  steps: Array<any> = [];

  stepperFormGroup: FormGroup;
  stepControlFormGroup: FormGroup;

  formControlMap: Object;
  handleMainSubmit: any;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
   if (this.config) {
     const { steps, mainFormSubmitHandler } = this.config;
     this.steps = steps;
     this.handleMainSubmit = mainFormSubmitHandler;

     this.formControlMap = steps.reduce((acc, curStep) => ({ ...acc, ...curStep.formControlMap }), {});
     this.stepperFormGroup = this.fb.group(this.formControlMap);

     this.stepControlFormGroup = steps.reduce((acc, currStep) =>
       ({ ...acc, [currStep.stepControlName]: this.fb.group(currStep.formControlMap) }), {});
   }

  }

  clearForm = () => {
    Object.values(this.stepControlFormGroup).forEach(formGroup =>
      Object.values(formGroup.controls).forEach((control: FormControl) => control.setValue(''))
    );

    this.stepper.selectedIndex = 0;
  }

  cb(component: ComponentRef<any>, inputMap?: Object) {
    return {
      component,
      inputMap,
      clearForm: this.clearForm,
      stepper: this.stepper,
      handleMainSubmit: this.handleMainSubmit,
      formControlMap: this.formControlMap,
      stepperFormGroup: this.stepperFormGroup,
    };
  }
}
