import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDatosCorporativosComponent } from './listado-datos-corporativos.component';

describe('ListadoDatosCorporativosComponent', () => {
  let component: ListadoDatosCorporativosComponent;
  let fixture: ComponentFixture<ListadoDatosCorporativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDatosCorporativosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoDatosCorporativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
