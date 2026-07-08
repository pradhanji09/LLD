export interface Notification {
  getContent(): string;
}

export class simpleNotification implements Notification {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }
}

abstract class NotificationDecorator implements Notification {
  protected wrapped: Notification;

  constructor(wraped: Notification) {
    this.wrapped = wraped;
  }

  getContent(): string {
    return this.wrapped.getContent();
  }
}

export class HeaderDecorator extends NotificationDecorator {
  getContent(): string {
    return `--- New Notification ---\n${this.wrapped.getContent()}`;
  }
}

export class FooterDecorator extends NotificationDecorator {
  getContent(): string {
    return `${this.wrapped.getContent()}\n--- End ---`;
  }
}

export class SignatureDecorator extends NotificationDecorator {
  getContent(): string {
    return `${this.wrapped.getContent()}\n\n- Sent by FoodApp`;
  }
}
