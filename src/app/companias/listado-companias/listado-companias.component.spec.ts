import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCompaniasComponent } from './listado-companias.component';

describe('ListadoCompaniasComponent', () => {
  let component: ListadoCompaniasComponent;
  let fixture: ComponentFixture<ListadoCompaniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCompaniasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoCompaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
