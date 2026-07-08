import type { ChannelType } from "../startergy/channel.stratergy.js";

interface Observer {
  update(event: NotifiationEvent): void;
}

export interface NotifiationEvent {
  message: string;
  channel: ChannelType;
}

export interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(event: NotifiationEvent): void;
}

export class NotificationObservable implements Observable {
  private observerList: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observerList.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observerList = this.observerList.filter((obs) => obs !== observer);
  }

  notify(event: NotifiationEvent): void {
    for (const obs of this.observerList) {
      obs.update(event);
    }
  }
}

export class LoggerObserver implements Observer {
  update(event: NotifiationEvent): void {
    console.log(`[LOG] - Sent via ${event.channel}: "${event.message}"`);
  }
}

export class HistoryObserver implements Observer {
  update(event: NotifiationEvent): void {
    console.log(
      `[HISTORY] Saving to DB: ${event.channel} - "${event.message}"`,
    );
  }
}
