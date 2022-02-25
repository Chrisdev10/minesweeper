import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameinitComponent } from './gameinit.component';

describe('GameinitComponent', () => {
  let component: GameinitComponent;
  let fixture: ComponentFixture<GameinitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameinitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameinitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
