import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsFixComponent } from './registrations-fix.component';

describe('RegistrationsFixComponent', () => {
  let component: RegistrationsFixComponent;
  let fixture: ComponentFixture<RegistrationsFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationsFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
