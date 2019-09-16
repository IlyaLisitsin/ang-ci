import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AddPostCaptionComponent } from '../steps/add-post-caption/add-post-caption.component';
import { UploadPictureComponent } from '../steps/upload-picture/upload-picture.component';
import { CropPictureComponent } from '../steps/crop-picture/crop-picture.component';
import { StepConfig } from '../../../shared/models/StepConfig';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  addPostStepperConfig: StepConfig;

  originalImageFormControl = new FormControl('', [
    Validators.required,
  ]);
  croppedImageFormControl = new FormControl('', [
    Validators.required,
  ]);
  postTextFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor() {
  }

  ngOnInit() {
    this.addPostStepperConfig = {
      mainFormSubmitHandler: this.submit,
      steps: [
        {
          label: 'upload image',
          stepControlName: 'uploadImage',
          formControlMap: {
            originalImageFormControl: this.originalImageFormControl,
          },
          content: UploadPictureComponent,
        },
        {
          label: 'crop image',
          stepControlName: 'cropImage',
          formControlMap: {
            croppedImageFormControl: this.croppedImageFormControl,
          },
          inputMap: {
            aspectRatio: 4 / 2,
          },
          content: CropPictureComponent,
        },
        {
          label: 'add post caption',
          stepControlName: 'addPostCaption',
          formControlMap: {
            postTextFormControl: this.postTextFormControl,
          },
          content: AddPostCaptionComponent,
        }
      ],
    };
  }

  submit(values) {
    console.log('FROM ADD PISTS', values);
  }
}
