export interface UserSessionDef{
  name: string;
  email: string;
}

export class UserSession implements UserSessionDef{
  email!: string;
  name!: string;
}
