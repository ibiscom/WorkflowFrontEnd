import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesGrupoComponent } from './acciones-grupo.component';

describe('AccionesGrupoComponent', () => {
  let component: AccionesGrupoComponent;
  let fixture: ComponentFixture<AccionesGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesGrupoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

