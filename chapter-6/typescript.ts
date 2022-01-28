// 1.
class Airplane {
  private name: string;
  private isFlying: boolean;

  constructor(name: string) {
    this.name = name;
    this.isFlying = false;
  }

  takeOff(): void {
    this.isFlying = true;
  }

  land(): void {
    this.isFlying = false;
  }

  isInTheSky(): boolean {
    return this.isFlying;
  }
}

const su = new Airplane("Sukhoi Su-57");

console.log("su's state just after construction: ", su);
su.takeOff();
console.log("su's 'isFlying' after takeOff() is: ", su.isInTheSky());
su.land();
console.log("su's 'isFlying' after land() is: ", su.isInTheSky());

// 2.
class Person {
  private static MAX_FOOD_SIZE = 10;
  private name: string;
  private age: number;
  private stomach: string[];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.stomach = new Array(Person.MAX_FOOD_SIZE);
  }

  eat(food: string): void {
    const index = this.stomach.findIndex((el) => el === undefined);
    if (index !== -1) {
      this.stomach[index] = food;
    }
  }

  clear(): void {
    this.stomach = new Array(Person.MAX_FOOD_SIZE);
  }

  getStomach(): string[] {
    return [...this.stomach];
  }
}
const bob = new Person("Bob", 22);
console.log("bob's initial state: ", bob);

const fruit = [
  "banana",
  "apple",
  "orange",
  "pear",
  "mango",
  "kiwi",
  "lime",
  "mandarin",
  "cherry",
  "peach",
];
fruit.forEach((el) => {
  bob.eat(el);
});

console.log("bob's 'stomach' after breakfast looks like: ", bob.getStomach());
bob.eat("watermelon"); // can't eat, he is full
console.log("bob's 'stomach' after watermelon: ", bob.getStomach());
bob.clear();
console.log("bob's 'stomach' after clear(): ", bob.getStomach());

// 3.
class Baby extends Person {
  private favoriteToy: string;

  constructor(name: string, age: number, favoriteToy: string) {
    super(name, age);
    this.favoriteToy = favoriteToy;
  }

  play(): string {
    return `Playing with a ${this.favoriteToy}`;
  }
}

const babyBoy = new Baby("Boy", 3, "ball");
console.log(babyBoy.play());
