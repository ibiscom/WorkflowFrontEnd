import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoIndicadorDeTareaComponent } from './listado-indicadordetarea.component';

describe('ListadoIndicadorDeTareaComponent', () => {
  let component: ListadoIndicadorDeTareaComponent;
  let fixture: ComponentFixture<ListadoIndicadorDeTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoIndicadorDeTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoIndicadorDeTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

