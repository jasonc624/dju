import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedSongsComponent } from './requested-songs.component';

describe('RequestedSongsComponent', () => {
  let component: RequestedSongsComponent;
  let fixture: ComponentFixture<RequestedSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestedSongsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
