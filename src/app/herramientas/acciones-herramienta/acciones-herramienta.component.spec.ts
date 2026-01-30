import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesHerramientaComponent } from './acciones-herramienta.component';

describe('AccionesHerramientaComponent', () => {
  let component: AccionesHerramientaComponent;
  let fixture: ComponentFixture<AccionesHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesHerramientaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

