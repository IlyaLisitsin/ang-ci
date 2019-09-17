import {
  ComponentFactoryResolver,
  Directive,
  Input,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[view]'
})
export class ViewDirective {
  currentViewContainer: ViewContainerRef;

  constructor(
    viewContainer: ViewContainerRef,
    private compFactoryResolver: ComponentFactoryResolver,

  ) {
    this.currentViewContainer = viewContainer;
  }

  @Input()
  set view({ component, formControlMap, stepper, stepperFormGroup, handleMainSubmit, inputMap, clearForm }) {
    const factory = this.compFactoryResolver.resolveComponentFactory(component);

    if (this.currentViewContainer.element.nativeElement.parentNode
      && this.currentViewContainer.element.nativeElement.parentNode.childElementCount < 1) {

      const instance: any = this.currentViewContainer.createComponent(factory).instance;
      instance.stepperFormGroup = stepperFormGroup;
      instance.handleMainSubmit = handleMainSubmit;
      instance.inputMap = inputMap;
      instance.clearForm = clearForm;

      Object.keys(formControlMap).forEach(controlName => {
        if (instance[`${controlName}Change`]) {
          instance[`${controlName}Change`].subscribe(
            val => {
              formControlMap[controlName].setValue(val);
              stepper.next();
            });
        }
      });
    }
  }

}
