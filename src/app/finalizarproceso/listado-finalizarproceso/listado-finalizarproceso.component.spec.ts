import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFinalizarprocesoComponent } from './listado-finalizarproceso.component';

describe('ListadoFinalizarprocesoComponent', () => {
  let component: ListadoFinalizarprocesoComponent;
  let fixture: ComponentFixture<ListadoFinalizarprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoFinalizarprocesoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoFinalizarprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

