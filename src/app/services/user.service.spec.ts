/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UserService]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
