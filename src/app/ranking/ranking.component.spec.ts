import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RankingComponent } from './ranking.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RankingComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RankingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-test-app'`, () => {
    const fixture = TestBed.createComponent(RankingComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-test-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RankingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('angular-test-app app is running!');
  });
});
