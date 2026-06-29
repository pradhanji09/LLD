interface Walkable {
  walk(): void;
}

interface Flyable {
  fly(): void;
}

class NormalWalk implements Walkable {
  walk(): void {
    console.log(`This is Normal Walk`);
  }
}

class NoWalk implements Walkable {
  walk(): void {
    console.log(`I Can not Walk`);
  }
}

class NormalFly implements Flyable {
  fly(): void {
    console.log(`This is Normal Fly`);
  }
}

class FlyWithJet implements Flyable {
  fly(): void {
    console.log(`This is Fly with Jet`);
  }
}

class NoFly implements Flyable {
  fly(): void {
    console.log(`I can nor Fly`);
  }
}

class RobotContext {
  private walkable: Walkable;
  private flyable: Flyable;

  constructor(walkable: Walkable, flyable: Flyable) {
    this.walkable = walkable;
    this.flyable = flyable;
  }

  performWalk(): void {
    this.walkable.walk();
  }

  performFly(): void {
    this.flyable.fly();
  }
}

const myRobot = new RobotContext(new NormalWalk(), new FlyWithJet());
myRobot.performFly();
myRobot.performWalk();
