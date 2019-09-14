import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AddPostCaptionComponent } from '../steps/add-post-caption/add-post-caption.component';
import { UploadPictureComponent } from '../steps/upload-picture/upload-picture.component';
import { CropPictureComponent } from '../steps/crop-picture/crop-picture.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  addPostForm: FormGroup;
  addPostStepperConfig: any;

  imageFormControl = new FormControl('');
  postTextFormControl = new FormControl('');

  constructor(
    fb: FormBuilder,
  ) {
    this.addPostForm = fb.group({
      image: this.imageFormControl,
      postText: this.postTextFormControl,
    })
  }

  ngOnInit() {
    const arr = {
      mainFormSubmitHandler: this.submit,
      steps: [
        {
          label: 'upload image',
          formControlMap: {
            imageFormControl: this.imageFormControl,
          },
          content: UploadPictureComponent,
        },
        {
          label: 'crop image',
          formControlMap: {
            imageFormControl: this.imageFormControl,
          },
          // inputsMap: {
          //   uploadedImage: this.imageFormControl.value
          // },
          content: CropPictureComponent,
        },
        {
          label: 'add post caption',
          formControlMap: {
            postTextFormControl: this.postTextFormControl,
          },
          content: AddPostCaptionComponent,
        }
      ],
    }

    this.addPostStepperConfig = arr;
  }

  submit(values) {
    console.log('FROM ADD PISTS', values)
  }
}
