import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttweetComponent } from './posttweet.component';

describe('PosttweetComponent', () => {
  let component: PosttweetComponent;
  let fixture: ComponentFixture<PosttweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosttweetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
