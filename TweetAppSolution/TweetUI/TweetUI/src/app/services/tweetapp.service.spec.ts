import { TestBed } from '@angular/core/testing';

import { TweetappService } from './tweetapp.service';

describe('TweetappService', () => {
  let service: TweetappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
