import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHeaderComponent } from './image-header.component';

describe('ImageHeaderComponent', () => {
  let component: ImageHeaderComponent;
  let fixture: ComponentFixture<ImageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
