import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Cropper from 'cropperjs/dist/cropper.esm.js';

interface DialogData {
  base64String: string;
}

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('image')
  public mainImage: ElementRef;

  // tslint:disable-next-line:no-input-rename
  @Input('src')
  public imageSource: string;

  @ViewChild('croppedImageRef') croppedImageRef: ElementRef;
  public croppedImageSrc: string;
  private cropper: Cropper;

  public constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.croppedImageSrc = '';
  }

  public ngAfterViewInit() {
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

  zoomToFull() {
    this.cropper.zoomTo(1);
  }

  reset()  {
    this.cropper.reset();
  }

  cancel() {
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close(this.croppedImageRef.nativeElement.src);
  }

  public ngOnInit() { }
}
