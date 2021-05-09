import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtweetsComponent } from './viewtweets.component';

describe('ViewtweetsComponent', () => {
  let component: ViewtweetsComponent;
  let fixture: ComponentFixture<ViewtweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtweetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
