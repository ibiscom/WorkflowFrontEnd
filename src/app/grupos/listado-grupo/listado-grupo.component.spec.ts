import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGrupoComponent } from './listado-grupo.component';

describe('ListadoGrupoComponent', () => {
  let component: ListadoGrupoComponent;
  let fixture: ComponentFixture<ListadoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoGrupoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

