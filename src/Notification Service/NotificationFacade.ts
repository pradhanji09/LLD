import {
  FooterDecorator,
  HeaderDecorator,
  simpleNotification,
  type Notification,
} from "./decorators/notification.decorator.js";
import { ChannelFactory } from "./factory/channel.factory.js";
import {
  HistoryObserver,
  LoggerObserver,
  NotificationObservable,
  type NotifiationEvent,
} from "./observer/notification.observer.js";
import { ChannelType } from "./startergy/channel.stratergy.js";

interface SendNotificationOptions {
  to: string;
  message: string;
  channel: ChannelType;
  addHeader?: boolean;
  addFooter?: boolean;
  addSignature?: boolean;
  addTimestamp?: boolean;
}

class NotificationFacade {
  private static instance: NotificationFacade;
  private channelFactory: ChannelFactory;
  private observable: NotificationObservable;

  private constructor() {
    this.channelFactory = new ChannelFactory();
    this.observable = new NotificationObservable();

    this.observable.subscribe(new LoggerObserver());
    this.observable.subscribe(new HistoryObserver());
  }

  static getInstance(): NotificationFacade {
    if (!NotificationFacade.instance)
      NotificationFacade.instance = new NotificationFacade();

    return NotificationFacade.instance;
  }

  send(options: SendNotificationOptions) {
    let notification: Notification = new simpleNotification(options.message);
    if (options.addHeader) notification = new HeaderDecorator(notification);
    if (options.addFooter) notification = new FooterDecorator(notification);
    if (options.addHeader) notification = new HeaderDecorator(notification);

    const finalContent = notification.getContent();
    const channel = this.channelFactory.getChannel(options.channel);
    channel.send(finalContent, options.to);

    const event: NotifiationEvent = {
      channel: options.channel,
      message: finalContent,
    };

    this.observable.notify(event);
  }
}

const testData: SendNotificationOptions = {
  message: "Your order has shipped",
  channel: ChannelType.SMS,
  addHeader: true,
  addTimestamp: true,
  addSignature: true,
  to: "+91 9874563210",
};

const notifier = NotificationFacade.getInstance();
notifier.send(testData);
