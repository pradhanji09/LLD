// There will be one Subject/Observable class
// That will have list/Array of observer and will have subcribe(), unsubcribe(), notify() method
// An inteface for Different Type of Observer, that will have update()
// While state changes loop through the Array and use update() of Observer

enum OrderStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

interface Observer {
  update(status: OrderStatus): void;
}

class Order {
  private status: OrderStatus = OrderStatus.CREATED;
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    for (const obs of this.observers) {
      obs.update(this.status);
    }
  }

  updateStatus(status: OrderStatus) {
    this.status = status;
    console.log(`----- Status Undated ----`);
    this.notify();
  }
}

class NotificationObserver implements Observer {
  update(status: OrderStatus): void {
    console.log(`This Status update to ${status}`);
  }
}

class AnalyticsObserver implements Observer {
  update(status: OrderStatus): void {
    console.log(`Logging analytics event: order_status=${status}`);
  }
}

const subject = new Order();
const analytics = new AnalyticsObserver();
const notification = new NotificationObserver();

subject.subscribe(analytics);
subject.subscribe(notification);

subject.updateStatus(OrderStatus.PENDING);
subject.updateStatus(OrderStatus.COMPLETED);
