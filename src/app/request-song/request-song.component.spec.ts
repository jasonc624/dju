import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSongComponent } from './request-song.component';

describe('RequestSongComponent', () => {
  let component: RequestSongComponent;
  let fixture: ComponentFixture<RequestSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
