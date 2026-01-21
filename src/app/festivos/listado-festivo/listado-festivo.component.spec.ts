import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFestivoComponent } from './listado-festivo.component';

describe('ListadoFestivoComponent', () => {
  let component: ListadoFestivoComponent;
  let fixture: ComponentFixture<ListadoFestivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoFestivoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoFestivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
