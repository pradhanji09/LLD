export enum ChannelType {
  SMS = "SMS",
  EMAIL = "EMAIL",
}

export interface Channel {
  send(msg: string, to: string): void;
}

export class SmsChannel implements Channel {
  send(msg: string, to: string): void {
    console.log(`This msg : ${msg} sent by SMS to ${to}`);
  }
}

export class EmailChannel implements Channel {
  send(msg: string, to: string): void {
    console.log(`This msg : ${msg} sent by Email to ${to}`);
  }
}
