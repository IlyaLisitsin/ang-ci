import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPictureComponent } from './crop-picture.component';

describe('CropPictureComponent', () => {
  let component: CropPictureComponent;
  let fixture: ComponentFixture<CropPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
