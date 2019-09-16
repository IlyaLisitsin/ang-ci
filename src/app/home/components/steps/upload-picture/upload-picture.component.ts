import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable } from 'rxjs/observable';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})
export class UploadPictureComponent implements OnInit {
  @Input() stepperFormGroup: FormGroup;
  @Output() originalImageFormControlChange = new EventEmitter;
  isWebcamView = false;

  allowCameraSwitch = false;
  // public multipleWebcamsAvailable = false;
  deviceId: string;
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 300},
    // height: {ideal: 300}
  };
  errors: WebcamInitError[] = [];

  trigger: Subject<void> = new Subject<void>();
  nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  // public showNextWebcam(directionOrDeviceId: boolean|string): void {
  //   // true => move forward through devices
  //   // false => move backwards through devices
  //   // string => move to device with given deviceId
  //   this.nextWebcam.next(directionOrDeviceId);
  // }

  handleImage(webcamImage: WebcamImage): void {
    this.stepperFormGroup.setValue({
      ...this.stepperFormGroup.value,
      originalImageFormControl: webcamImage.imageAsDataUrl,
    });
    this.originalImageFormControlChange.emit(webcamImage.imageAsDataUrl);
    this.isWebcamView = false;
  }

  cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  showWebcamView() {
    this.isWebcamView = true;
  }

  uploadFileHandle(event) {
    new Promise((resolve) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.readAsDataURL(event.target.files[0]);

      event.target.value = '';
    }).then(base64String => {
      this.stepperFormGroup.setValue({
        ...this.stepperFormGroup.value,
        originalImageFormControl: base64String,
      });

      this.originalImageFormControlChange.emit(base64String);
    });
  }

  goBackButtonClick() {
    this.isWebcamView = false;
  }

  constructor() { }

  ngOnInit() {
    // WebcamUtil.getAvailableVideoInputs()
    //   .then((mediaDevices: MediaDeviceInfo[]) => {
    //     this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    //   });
  }
}
