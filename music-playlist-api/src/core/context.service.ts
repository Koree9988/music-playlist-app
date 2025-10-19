/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Scope } from '@nestjs/common';
import { User } from 'src/models/models';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private _user: User;

  set user(user: User) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}
