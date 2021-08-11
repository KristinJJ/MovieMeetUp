import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRankingComponent } from './final-ranking.component';

describe('FinalRankingComponent', () => {
  let component: FinalRankingComponent;
  let fixture: ComponentFixture<FinalRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
