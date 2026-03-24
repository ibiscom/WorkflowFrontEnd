import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPatronComponent } from './listado-patron.component';

describe('ListadoPatronComponent', () => {
  let component: ListadoPatronComponent;
  let fixture: ComponentFixture<ListadoPatronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPatronComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

