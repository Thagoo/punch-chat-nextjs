export interface IMessageData {
  type: "message";
  message: {
    name: string | null;
    message: string | null;
    email: string | null;
    date: string | null;
    toEmail: string | null;
  };
}
