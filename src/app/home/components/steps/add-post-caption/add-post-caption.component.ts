import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-post-caption',
  templateUrl: './add-post-caption.component.html',
  styleUrls: ['./add-post-caption.component.scss']
})
export class AddPostCaptionComponent implements OnInit {
  @Input() handleMainSubmit: any;
  @Input() stepperFormGroup: FormGroup;
  @Output() postTextFormControlChange = new EventEmitter;

  @ViewChild('input') input: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  submitClick() {
    this.stepperFormGroup.setValue({
      ...this.stepperFormGroup.value,
      postTextFormControl: this.input.nativeElement.value,
    });
    this.postTextFormControlChange.emit(this.input.nativeElement.value);

    this.handleMainSubmit(this.stepperFormGroup.value);
  }

}
