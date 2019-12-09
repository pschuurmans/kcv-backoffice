import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsEditComponent } from './registrations-edit.component';

describe('RegistrationsEditComponent', () => {
  let component: RegistrationsEditComponent;
  let fixture: ComponentFixture<RegistrationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
