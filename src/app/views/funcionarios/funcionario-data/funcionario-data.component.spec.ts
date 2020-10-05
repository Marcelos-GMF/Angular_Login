import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDataComponent } from './funcionario-data.component';

describe('FuncionarioDataComponent', () => {
  let component: FuncionarioDataComponent;
  let fixture: ComponentFixture<FuncionarioDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
