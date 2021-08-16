import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRankingDetails } from './eventRankingDetails.component';

describe('EventRankingDetails', () => {
  let component: EventRankingDetails;
  let fixture: ComponentFixture<EventRankingDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRankingDetails ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRankingDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
