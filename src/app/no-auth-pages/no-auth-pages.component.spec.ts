import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthPagesComponent } from './no-auth-pages.component';

describe('NoAuthPagesComponent', () => {
  let component: NoAuthPagesComponent;
  let fixture: ComponentFixture<NoAuthPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAuthPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAuthPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
