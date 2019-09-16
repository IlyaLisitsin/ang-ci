import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { AddPostCaptionComponent } from '../steps/add-post-caption/add-post-caption.component';
import { UploadPictureComponent } from '../steps/upload-picture/upload-picture.component';
import { CropPictureComponent } from '../steps/crop-picture/crop-picture.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  addPostStepperConfig: any;

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
    console.log('FROM ADD PISTS', values)
  }
}
