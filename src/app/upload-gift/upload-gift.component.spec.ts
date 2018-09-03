import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGiftComponent } from './upload-gift.component';

describe('UploadGiftComponent', () => {
  let component: UploadGiftComponent;
  let fixture: ComponentFixture<UploadGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
