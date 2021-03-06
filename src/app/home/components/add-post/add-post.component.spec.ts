import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddPostComponent } from './add-post.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';
import { MaterialModule } from '../../../material.module';
import { ViewDirective } from '../../../shared/directives/view.directive';
import { UploadPictureComponent } from '../steps/upload-picture/upload-picture.component';

import { CropPictureComponent } from '../steps/crop-picture/crop-picture.component';
import { AddPostCaptionComponent } from '../steps/add-post-caption/add-post-caption.component';
import { HomeService } from '../../services/home/home.service';
import { SpinnerService } from '../../../shared/services/spinner/spinner.service';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        WebcamModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AddPostComponent,
        StepperComponent,
        ViewDirective,
        UploadPictureComponent,
        CropPictureComponent,
        AddPostCaptionComponent,
      ],
      providers: [
        HomeService,
        SpinnerService,
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: {
      entryComponents: [
        UploadPictureComponent,
        CropPictureComponent,
        AddPostCaptionComponent,
    ] } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
