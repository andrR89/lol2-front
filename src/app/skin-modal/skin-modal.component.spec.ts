import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinModalComponent } from './skin-modal.component';

describe('SkinModalComponent', () => {
  let component: SkinModalComponent;
  let fixture: ComponentFixture<SkinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
