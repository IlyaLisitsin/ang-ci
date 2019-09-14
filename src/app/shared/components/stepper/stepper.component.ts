import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() config: any;
  steps: Array<any>;

  stepperFormGroup: FormGroup;
  inputFormControl = new FormControl('');

  formControlMap: Object;
  submitHandler: any;

  constructor(
    private fb: FormBuilder,
  ) {}

  submitStepperForm() {
    this.submitHandler(this.stepperFormGroup.value)
  }

  ngOnInit() {
    const { steps, mainFormSubmitHandler } = this.config;
    this.steps = steps;
    this.submitHandler = mainFormSubmitHandler;

    this.formControlMap = steps.reduce((acc, curStep) => ({ ...acc, ...curStep.formControlMap }), {});
    this.stepperFormGroup = this.fb.group(this.formControlMap);
  }

  cb(component) {
    return { component, formControlMap: this.formControlMap };
  }

}
