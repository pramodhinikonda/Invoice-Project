export interface IUser {
  userID: string;
  clientID: string;
  name: string;
  email: string;
  mobile: string
}

export interface IOrganization {
  organizationID: string;
  clientID: string;
  name: string;
  isDefaultOrganization: boolean;
}

export class UserInfo {
  ClientID: string;
  UserID: string;
  OrganizationID: string;
}

export class User {
  ID: string;
  Email: string;
  Password: string;
  FullName: string;
  Mobile: string;
  RoleID: string;
  Status: string;
  IsEmailVerified: string;
  IsMobileVerified: string
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export interface UserStatus {
  Status: string,
  UserDetails: User
}
