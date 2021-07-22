import { Roles, users } from '../dummyUsers';

export class AuthenticationRepository {
  // eslint-disable-next-line
  constructor() {}

  public authenticate(userName: string, password: string) {
    return new Promise((resolve, reject) => {
      let user = users.find((item) => item.UserName.toLowerCase() === userName && item.Password === password);
      let credentials = null;
      if (user) {
        let role = Roles.find((item) => item.ID === user?.UserRole);
        credentials = {
          userName: user.UserName,
          role: role,
          id: user.ID,
          email: user.Email,
        };
        resolve(credentials);
      } else {
        reject('Invalid User name or password');
      }
    });
  }
}
