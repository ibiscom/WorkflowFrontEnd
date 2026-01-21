import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccionesDependenciaComponent } from './acciones-dependencia.component';


describe('AccionesDependenciaComponent', () => {
  let component: AccionesDependenciaComponent;
  let fixture: ComponentFixture<AccionesDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesDependenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
