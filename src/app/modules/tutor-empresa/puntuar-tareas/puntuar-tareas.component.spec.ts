import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuarTareasComponent } from './puntuar-tareas.component';

describe('PuntuarTareasComponent', () => {
  let component: PuntuarTareasComponent;
  let fixture: ComponentFixture<PuntuarTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntuarTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuarTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
