import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JalanListComponent } from './jalan-list.component';

describe('JalanListComponent', () => {
  let component: JalanListComponent;
  let fixture: ComponentFixture<JalanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JalanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JalanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
