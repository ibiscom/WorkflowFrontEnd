import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEventoinicioComponent } from './listado-eventoinicio.component';

describe('ListadoEventoinicioComponent', () => {
  let component: ListadoEventoinicioComponent;
  let fixture: ComponentFixture<ListadoEventoinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoEventoinicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoEventoinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
