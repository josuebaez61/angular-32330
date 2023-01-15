import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/models/user.model';
import { SingleUserResponse } from 'src/app/models/reqres.interfaces';

const mockUser: User = new User(
  7,
  'michael.lawson@reqres.in',
  'Michael',
  'Lawson',
  'https://reqres.in/img/faces/7-image.jpg'
);

const mockSingleUserResponse: SingleUserResponse = {
  data: {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg'
  },
  support: {
      url: 'https://reqres.in/#support-heading',
      text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
  }
}

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        SessionService,
      ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should work', (done) => {
    service.login({
      email: mockUser.email,
      password: '123456',
    }).subscribe((res) => {
      expect(res).toEqual(mockUser)
      done(); // SE LLAMA PARA ESCUCHAR LAS ASINCRONIAS
    });
    httpController.expectOne({
      method: 'POST',
      url: 'https://reqres.in/api/login'
    }).flush({
      token: 'QpwL5tke4Pnpja7X2'
    })
    httpController.expectOne({
      method: 'GET',
      url: 'https://reqres.in/api/users/7'
    }).flush(mockSingleUserResponse)
  });
});
