//Component Interface : for common iterface for Mario and all power-up Decorator
interface Character {
  getAbility(): string;
}

// Concrete Component : Basic Mario Character
class Mario implements Character {
  getAbility(): string {
    return "Mario";
  }
}

// Abstract Decorator : CharacterDecorator is-a Character and has-a Character
abstract class CharacterDecorator implements Character {
  protected character: Character;
  constructor(c: Character) {
    this.character = c;
  }

  getAbility(): string {
    return this.character.getAbility();
  }
}

// Concrete Decorator : Height Up
class HeightUp extends CharacterDecorator {
  getAbility(): string {
    return this.character.getAbility() + " with Height Up";
  }
}
// Concrete Decorator : Gun Power Up
class GunPowerUp extends CharacterDecorator {
  getAbility(): string {
    return this.character.getAbility() + " with Gun Power Up";
  }
}
// Concrete Decorator : Star Power Up
class StarPowerUp extends CharacterDecorator {
  getAbility(): string {
    return this.character.getAbility() + " with Star Power Up";
  }
}

let mario = new Mario();
console.log(mario.getAbility());

mario = new HeightUp(mario);
console.log(mario.getAbility());

mario = new StarPowerUp(mario);
console.log(mario.getAbility());

mario = new GunPowerUp(mario);
console.log(mario.getAbility());
