import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgEffectComponent } from './bg-effect.component';

describe('BgEffectComponent', () => {
  let component: BgEffectComponent;
  let fixture: ComponentFixture<BgEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BgEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BgEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
