import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPayComponent } from './info-pay.component';

describe('InfoPayComponent', () => {
  let component: InfoPayComponent;
  let fixture: ComponentFixture<InfoPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
