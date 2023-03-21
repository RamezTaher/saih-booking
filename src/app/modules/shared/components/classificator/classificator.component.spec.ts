import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificatorComponent } from './classificator.component';

describe('ClassificatorComponent', () => {
  let component: ClassificatorComponent;
  let fixture: ComponentFixture<ClassificatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
