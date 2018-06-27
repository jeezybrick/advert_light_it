import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPreloaderComponent } from './main-preloader.component';

describe('MainPreloaderComponent', () => {
  let component: MainPreloaderComponent;
  let fixture: ComponentFixture<MainPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
