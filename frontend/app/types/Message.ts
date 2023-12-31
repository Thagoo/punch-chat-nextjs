export interface TextMessage {
  name: string | null;
  message: string | null;
  email: string | null;
  date: string | null;
  toEmail: string | null;
}

export interface MessageInitialState {
  type: string | null;
  payload: {
    name: string | null;
    message: string | null;
    email: string | null;
    date: string | null;
    toEmail: string;
  };
}
