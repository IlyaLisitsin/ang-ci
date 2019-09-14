import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl} from "@angular/forms";
import Cropper from 'cropperjs/dist/cropper.esm.js';

@Component({
  selector: 'app-crop-picture',
  templateUrl: './crop-picture.component.html',
  styleUrls: ['./crop-picture.component.scss']
})
export class CropPictureComponent implements OnInit, AfterViewChecked {
  @Input() stepperFormControl: FormControl;
  @Output() imageFormControlChange = new EventEmitter;

  @ViewChild('image')
  public mainImage: ElementRef;

  // tslint:disable-next-line:no-input-rename
  @Input('src')
  public imageSource: string;

  @ViewChild('croppedImageRef') croppedImageRef: ElementRef;
  public croppedImageSrc: string;
  private cropper: Cropper;

  public constructor() {
    this.croppedImageSrc = '';
  }

  initCropper() {
    this.cropper = new Cropper(this.mainImage.nativeElement, {
      zoomable: true,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.croppedImageSrc = canvas.toDataURL('image/png');
      },
    });
  }

  ngAfterViewChecked(): void {
    console.log('content checked')
    if (this.stepperFormControl.value.imageFormControl && !this.cropper) {
      this.initCropper();
    }
  }

  zoomToFull() {
    this.cropper.zoomTo(1);
  }

  reset()  {
    this.cropper.reset();
  }

  ngOnInit() {
    this.stepperFormControl && console.log(this.stepperFormControl.value)
  }

}
