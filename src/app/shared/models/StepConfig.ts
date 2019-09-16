export interface StepConfig {
  mainFormSubmitHandler?: any;
  steps: Array<{
    label: string;
    stepControlName: string;
    formControlMap: Object;
    content: any;
    inputMap?: Object;
  }>;
}
