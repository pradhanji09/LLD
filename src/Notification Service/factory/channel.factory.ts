import {
  ChannelType,
  EmailChannel,
  SmsChannel,
  type Channel,
} from "../startergy/channel.stratergy.js";

export class ChannelFactory {
  public getChannel(type: ChannelType): Channel {
    switch (type) {
      case ChannelType.SMS:
        return new SmsChannel();
      case ChannelType.EMAIL:
        return new EmailChannel();
      default:
        throw new Error("Select Valid Channel");
    }
  }
}
