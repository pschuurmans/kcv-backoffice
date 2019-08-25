import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventScriptComponent } from './event-script.component';

describe('EventScriptComponent', () => {
  let component: EventScriptComponent;
  let fixture: ComponentFixture<EventScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
