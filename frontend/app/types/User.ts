export type User = {
  id: string | null;
  email: string | null;
  avatar: string | null;
  name: string | null;
  isAdmin: boolean | null;
};

export type UserInfoProps = {
  user: User | undefined;
};

export interface TargetUser {
  email: string;
  name: string;
  avatar: string;
}
