import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UploadImageComponent} from "../upload-image/upload-image.component";
import {SignInPageComponent} from "../../page/sign-in-page/sign-in-page.component";
import {TestComponent} from "../../../shared/components/test/test.component";

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
          content: UploadImageComponent,
          formGroup: this.addPostForm,
        },
        {
          label: 'jkjnkjk',
          formControlMap: {
            postTextFormControl: this.postTextFormControl,
          },
          content: TestComponent,
        }
      ],
    }

    this.addPostStepperConfig = arr;
  }

  submit(values) {
    console.log('FROM ADD PISTS', values)
  }
}
