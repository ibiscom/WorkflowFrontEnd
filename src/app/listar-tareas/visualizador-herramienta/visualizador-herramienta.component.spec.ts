import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorHerramientaComponent } from './visualizador-herramienta.component';

describe('VisualizadorHerramientaComponent', () => {
  let component: VisualizadorHerramientaComponent;
  let fixture: ComponentFixture<VisualizadorHerramientaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizadorHerramientaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizadorHerramientaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
