import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtweetComponent } from './searchtweet.component';

describe('SearchtweetComponent', () => {
  let component: SearchtweetComponent;
  let fixture: ComponentFixture<SearchtweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchtweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
