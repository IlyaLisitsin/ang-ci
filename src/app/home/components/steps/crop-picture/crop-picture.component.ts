import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import Cropper from 'cropperjs/dist/cropper.esm.js';

@Component({
  selector: 'app-crop-picture',
  templateUrl: './crop-picture.component.html',
  styleUrls: ['./crop-picture.component.scss']
})
export class CropPictureComponent implements OnInit {
  @Input() stepperFormGroup: FormGroup;
  @Output() croppedImageFormControlChange = new EventEmitter;

  @ViewChild('image') mainImage: ElementRef;

  @Input('src') imageSource: string;

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
      aspectRatio: 4 / 2,
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
    this.croppedImageFormControlChange.emit(this.croppedImageSrc);
  }

  ngOnInit() {
    this.stepperFormGroup.get('originalImageFormControl').valueChanges.subscribe(val => {
      this.mainImage.nativeElement.setAttribute('src', val)
        this.cropper && this.cropper.destroy();
        this.initCropper();
    })
  }

}
