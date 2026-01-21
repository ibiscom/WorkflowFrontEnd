import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearDependenciaComponent } from './crear-dependencia.component';



describe('CrearDependenciaComponent', () => {
  let component: CrearDependenciaComponent;
  let fixture: ComponentFixture<CrearDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDependenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
