export interface IActiveUser {
  name: string;
  avatar: string;
  email: string;
}

export interface Message {
  type: string;
  payload: any;
}

export interface ActiveUsersData {
  type: string;
  payload: IActiveUser[];
}
