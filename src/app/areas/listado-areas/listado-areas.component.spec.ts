import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAreasComponent } from './listado-areas.component';

describe('ListadoAreasComponent', () => {
  let component: ListadoAreasComponent;
  let fixture: ComponentFixture<ListadoAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAreasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
