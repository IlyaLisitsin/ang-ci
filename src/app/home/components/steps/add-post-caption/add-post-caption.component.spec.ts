import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostCaptionComponent } from './add-post-caption.component';

describe('AddPostCaptionComponent', () => {
  let component: AddPostCaptionComponent;
  let fixture: ComponentFixture<AddPostCaptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostCaptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
