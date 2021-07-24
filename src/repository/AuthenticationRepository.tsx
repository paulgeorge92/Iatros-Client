import { Roles, users } from '../dummyUsers';
import { Session } from '../models/Session';

export class AuthenticationRepository {
  // eslint-disable-next-line
  constructor() {}

  public authenticate(userName: string, password: string): Promise<Session> {
    return new Promise((resolve, reject) => {
      let user = users.find((item) => item.UserName.toLowerCase() === userName && item.Password === password);
      let session: Session = {};
      if (user) {
        let role = Roles.find((item) => item.ID === user?.UserRole);
        session = {
          ID: user.ID,
          UserName: user.UserName,
          SessionKey: '',
          Role: role,
          UserID: user.ID,
        };
        resolve(session);
      } else {
        reject('Invalid User name or password');
      }
    });
  }
}
