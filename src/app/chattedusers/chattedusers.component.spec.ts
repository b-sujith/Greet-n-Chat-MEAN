import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattedusersComponent } from './chattedusers.component';

describe('ChattedusersComponent', () => {
  let component: ChattedusersComponent;
  let fixture: ComponentFixture<ChattedusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChattedusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChattedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
