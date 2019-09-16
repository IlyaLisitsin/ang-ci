import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { UploadImageDialogComponent } from './upload-image-dialog.component';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';
import { AddPostCaptionComponent } from '../steps/add-post-caption/add-post-caption.component';
import { UploadPictureComponent } from '../steps/upload-picture/upload-picture.component';
import { CropPictureComponent } from '../steps/crop-picture/crop-picture.component';
import { WebcamModule } from 'ngx-webcam';

describe('UploadImageDialogComponent', () => {
  let component: UploadImageDialogComponent;
  let fixture: ComponentFixture<UploadImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        WebcamModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      declarations: [
        UploadImageDialogComponent,
        AddPostCaptionComponent,
        UploadPictureComponent,
        CropPictureComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
