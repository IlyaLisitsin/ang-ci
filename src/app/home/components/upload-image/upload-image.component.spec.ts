import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UploadImageComponent } from './upload-image.component';
import { HomeService } from '../../services/home/home.service';
import { MaterialModule } from '../../../material.module';

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MaterialModule,
      ],
      providers: [
        HomeService,
      ],
      declarations: [ UploadImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
