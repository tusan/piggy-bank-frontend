import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UserService, BadCredentialException, SessionStorage, UserClient } from './userService'
import sinon from 'sinon'

describe('users service', () => {
  let storage;
  let userClient;
  let sut;

  beforeEach(() => {
    storage = new SessionStorage();
    userClient = new UserClient();

    sut = new UserService(userClient, storage)
  })

  afterEach(() => {
    userClient.login.restore()
  })

  it('should put token in sessionStorage when login succeed', () => {
    sinon.stub(userClient, 'login').callsFake(() => "login_token");
    const spy = sinon.stub(storage, 'put');
    
    sut.login({
      username: "test_user",
      password: "password"
    });

    expect(spy.calledWith("token", "login_token")).toBeTruthy()
  });

  it('should throw BadCredentialException when login fails', () => {
    sinon.stub(userClient, 'login').throws(new BadCredentialException());
    expect(() => sut.login({})).toThrowError(BadCredentialException);
  });
});

describe('users client', () => {
  let sut;
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    sut = new UserClient();
  })

  it('should do ', async () => {
    const loginData = {
      username: "test_user",
      token: "token"
    };

    axiosMock
      .onPost('http://localhost:8080/api/v1/users/login', loginData)
      .reply(200, {
        username: "test_user",
        token: "token"
      })

    await expect(sut.login(loginData)).resolves.toEqual("token");
  });

  it('should do2 ', async () => {
    const loginData = {
      username: "test_user",
      token: "token"
    };

    axiosMock
      .onPost('http://localhost:8080/api/v1/users/login', loginData)
      .reply(401)

    await expect(sut.login(loginData)).rejects.toThrowError(BadCredentialException);
  });
});