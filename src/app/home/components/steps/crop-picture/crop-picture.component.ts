import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import Cropper from 'cropperjs/dist/cropper.esm.js';

@Component({
  selector: 'app-crop-picture',
  templateUrl: './crop-picture.component.html',
  styleUrls: ['./crop-picture.component.scss']
})
export class CropPictureComponent implements OnInit {
  @Input() stepperFormGroup: FormGroup;
  @Input() inputMap: any;
  @Output() croppedImageFormControlChange = new EventEmitter;

  @ViewChild('image') mainImage: ElementRef;

  croppedImageSrc: string;
  cropper: Cropper;
  isZoomToFull = false;

  constructor() {
    this.croppedImageSrc = '';
  }

  initCropper() {
    this.cropper = new Cropper(this.mainImage.nativeElement, {
      zoomable: true,
      scalable: false,
      aspectRatio: this.inputMap.aspectRatio,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.croppedImageSrc = canvas.toDataURL('image/png');
      },
    });
  }

  zoomToFull() {
    this.isZoomToFull ? this.cropper.reset() : this.cropper.zoomTo(1);
    this.isZoomToFull = !this.isZoomToFull;
  }

  crop() {
    this.cropper.reset();
    this.stepperFormGroup.setValue({
      ...this.stepperFormGroup.value,
      croppedImageFormControl: this.croppedImageSrc,
    });
    this.croppedImageFormControlChange.emit(this.croppedImageSrc);
  }

  ngOnInit() {
    this.stepperFormGroup && this.stepperFormGroup.get('originalImageFormControl').valueChanges.subscribe(val => {
      this.mainImage.nativeElement.setAttribute('src', val);
        this.cropper && this.cropper.destroy();
        this.initCropper();
    });
  }

}
