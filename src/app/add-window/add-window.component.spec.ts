import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWindowComponent } from './add-window.component';

describe('AddWindowComponent', () => {
  let component: AddWindowComponent;
  let fixture: ComponentFixture<AddWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
