import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCentroComponent } from './tutor-centro.component';

describe('TutorCentroComponent', () => {
  let component: TutorCentroComponent;
  let fixture: ComponentFixture<TutorCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorCentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
