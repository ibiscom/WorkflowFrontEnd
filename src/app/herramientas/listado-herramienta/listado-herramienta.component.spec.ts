import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHerramientaComponent } from './listado-herramienta.component';

describe('ListadoHerramientaComponent', () => {
  let component: ListadoHerramientaComponent;
  let fixture: ComponentFixture<ListadoHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoHerramientaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

