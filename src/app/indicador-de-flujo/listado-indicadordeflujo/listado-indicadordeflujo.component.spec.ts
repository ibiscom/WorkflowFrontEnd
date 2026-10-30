import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoIndicadorDeFlujoComponent } from './listado-indicadordeflujo.component';

describe('ListadoIndicadorDeFlujoComponent', () => {
  let component: ListadoIndicadorDeFlujoComponent;
  let fixture: ComponentFixture<ListadoIndicadorDeFlujoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoIndicadorDeFlujoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoIndicadorDeFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

