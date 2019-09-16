import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UploadPictureComponent } from '../steps/upload-picture/upload-picture.component';
import { CropPictureComponent } from '../steps/crop-picture/crop-picture.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

interface DialogData {
  base64String: string;
}

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements OnInit, AfterViewInit {
  updateAvatarStepperConfig: Object;
  @ViewChild('updateAvatarStepper') updateAvatarStepper: StepperComponent;

  originalImageFormControl = new FormControl('', [
    Validators.required,
  ]);
  croppedImageFormControl = new FormControl('', [
    Validators.required,
  ]);

  public constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cancel() {
    // this.updateAvatarStepper.clearForm();
    this.dialogRef.close(null);
  }

  submit() {
    console.log('submit ava')
  }

  public ngOnInit() {
    this.updateAvatarStepperConfig = {
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
      ],
    };
  }

  ngAfterViewInit(): void {
    this.updateAvatarStepper.stepperFormGroup.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.dialogRef.close(this.updateAvatarStepper.stepperFormGroup.value);
      }
    })
  }
}
