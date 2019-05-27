import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OferecerPage } from './oferecer.page';

describe('OferecerPage', () => {
  let component: OferecerPage;
  let fixture: ComponentFixture<OferecerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OferecerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OferecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
