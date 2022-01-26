// 1.
class Person {}
class Employee extends Person {}
class Developer extends Employee {}
const tom = new Developer();

// What is the output?

Object.getPrototypeOf(tom) === Developer.prototype; // A
Object.getPrototypeOf(tom) === Employee.prototype; // B
Developer.isPrototypeOf(tom); // C
Developer.prototype.isPrototypeOf(tom); // D
Employee.prototype.isPrototypeOf(tom); // E
Person.prototype.isPrototypeOf(tom); // F
Object.prototype.isPrototypeOf(tom); // G

// Answer
/**
 * prototype chain for "tom" object looks like:
 * tom ---> Developer.prototype ---> Employee.prototype ---> Person.prototype ---> Object.prototype ---> null
 * so
 * A -> true
 * B -> false, they are different objects
 * C -> false, "tom" is instanceof "Developer", but "Developer" isn't a prototype of "tom", 
                while "Developer.prototype" is!
                ("tom.__proto__",
                 "Object.getPrototypeOf(tom),
                 "Developer.prototype" - these are references to the same object)
 * D -> true, the "__proto__" of "tom" refers to the "Developer.prototype"
 * E -> true, "Employee.prototype" is in prototype chain of "tom"
 * F -> true, "Person.prototype" is in prototype chain of "tom", not directly but it is there
 * G -> true, with the same logic as ^
 */

// 2.
const a = () => {};
function B() {}

//
typeof a; // A
typeof B; // B
Object.getPrototypeOf(a); // C
Object.getPrototypeOf(B); // D
a.prototype; // E
B.prototype; // F

// Answer
/**
 * A -> "function"
 * B -> "function"
 * C -> Function.prototype
 * D -> Function.prototype;
 * E -> undefined, an arrow function doesn't have a default prototype property:
 * F -> prototype-object-of-B-function
 */

// 3.
// 'new' keyword

// Answer
/**
 * The new operator allows us to create an instance of an object type that has a constructor function.
 * Calling a function with the new operator returns an object that is an instance of the function.
 * The new keyword does the following things:
 *  1) Creates a blank, plain JavaScript object.
 *  2) Adds a property to the new object (__proto__) that links to the constructor function's prototype object
 *  3) Binds "this" to refer to the newly created object in the constructor
 *  4) Returns that newly created object if there is no other return statement
 */

// 4.
// Convert to ES5
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello from ${this.name}`);
  }
}

// solution:

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello from ${this.name}`);
};

// 5. Create an object, which has no prototype:

// Solution:

const obj = Object.create(null, {
  description: { value: "Object with no prototype" },
});

// 6.Optimize the code below

function Person(name) {
  this.name = name;
  this.speak = function () {
    console.log("Speaking:", this.name);
  };
}

const a = new Person("a");
const b = new Person("b");

console.log(a.speak());
console.log(b.speak());

// Solution:

function PersonOptimized(name) {
  this.name = name;
}

Person.prototype.speak = function () {
  console.log("Speaking:", this.name);
};

// 7.
// Create Airplane class / constructor-function, with name argument

// All airplanes(instances) should have their own “isFlying” property․ with init value of 'false'
// All airplanes should have 'takeOff()' and 'land()' methods
// - on (takeOff), 'isFlying' should be true
// - on (land), 'isFlying' should be false

// Solution:

class Airplane {
  constructor(name) {
    this.name = name;
    this.isFlying = false;
  }

  takeOff() {
    this.isFlying = true;
  }
  land() {
    this.isFlying = false;
  }
}

const su = new Airplane("Sukhoi Su-57");

console.log("su's state just after construction: ", su);
su.takeOff();
console.log("su's 'isFlying' after takeOff() is: ", su.isFlying);
su.land();
console.log("su's 'isFlying' after land() is: ", su.isFlying);

//

function Airplane(name) {
  this.name = name;
  this.isFlying = false;
}

Airplane.prototype.takeOff = function () {
  this.isFlying = true;
};
Airplane.prototype.land = function () {
  this.isFlying = false;
};

const rafael = new Airplane("Dassault Rafale");
console.log("rafael's state just after construction: ", rafael);
rafael.takeOff();
console.log("rafael's 'isFlying' after takeOff() is: ", rafael.isFlying);
rafael.land();
console.log("rafael's 'isFlying' after land() is: ", rafael.isFlying);

// 8.
// Create Person class / constructor-function, with name and age args
// All persons should have an empty array 'stomach'
// Add 'eat' meathod eat('food').
// 'eat' method should add  'food' to the 'stomach'
// - Max stomach.length is 10
// Add 'clear' method.
// - clear should empty the stomach

// Solution:

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.stomach = [];
  }

  eat(food) {
    if (this.stomach.length < 10) {
      this.stomach.push(food);
    }
  }
  clear() {
    this.stomach.length = 0;
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

console.log("bob's 'stomach' after breakfast looks like: ", bob.stomach);
bob.eat("watermelon"); // can't eat, he is full
console.log("bob's 'stomach' after watermelon: ", bob.stomach);
bob.clear();
console.log("bob's 'stomach' after clear(): ", bob.stomach);

//

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.stomach = [];
}

Person.prototype.eat = function (food) {
  if (this.stomach.length < 10) {
    this.stomach.push(food);
  }
};
Person.prototype.clear = function () {
  this.stomach.length = 0;
};

const john = new Person("John", 22);
console.log("john's initial state: ", john);

fruit.forEach((el) => {
  john.eat(el);
});

console.log("john's 'stomach' after breakfast looks like: ", john.stomach);
john.eat("watermelon"); // can't eat, John is full
console.log("john's 'stomach' after watermelon: ", john.stomach);
john.clear();
console.log("john's 'stomach' after clear(): ", john.stomach);

// 9 (8.1).
const person1 = new Person("Person1", 14);
console.log(person1.toString());
// What is the output?

// ANSWER
/**
 * What we will see in the console is: '[object Object]'
 *
 * Every object descended from Object has a toString() method inherited from Object
 * By default it returns "[object type]", where type is the object type
 * In this example ->  typeof person1 is "object"
 */

// Overrite person's toString() to get output like this: 'Person1, 14':

// Solution

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.stomach = [];
  }

  eat(food) {
    if (this.stomach.length < 10) {
      this.stomach.push(food);
    }
  }
  clear() {
    this.stomach.length = 0;
  }
  toString() {
    return `${this.name}, ${this.age}`;
  }
  // get [Symbol.toStringTag]() {
  //   return `${this.name}, ${this.age}`;
  // }
  // [object Jimmy, 99]
}

const jimmy = new Person("Jimmy", 99);
console.log(jimmy.toString());

//

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.stomach = [];
}

Person.prototype.toString = function () {
  return `${this.name}, ${this.age}`;
};

const brad = new Person("Brad", 99);
console.log(brad.toString());

// 10 (8.2):
// Create Baby class / constructor-function, which extends Person class.
// Baby's constructor should have one more param 'favoriteToy'.
// Baby shpuld have 'play()' method, which should return
// string: 'Playing with x', where x is a favoriteToy of the instance.

// Solution

class Baby extends Person {
  constructor(name, age, favoriteToy) {
    super(name, age);
    this.favoriteToy = favoriteToy;
  }

  play() {
    return `Playing with ${this.favoriteToy}`;
  }
}

const babyBoy = new Baby("Boy", 3, "ball");
console.log(babyBoy.play());

//

function Baby(name, age, favoriteToy) {
  Person.call(this, name, age);
  this.favoriteToy = favoriteToy;
}

Baby.prototype = Object.create(Person.prototype);

Object.defineProperty(Baby.prototype, "constructor", {
  value: Baby,
  enumerable: false,
  writable: true,
});

Baby.prototype.play = function () {
  return `Playing with ${this.favoriteToy}`;
};

const babyGirl = new Baby("Girl", 5, "doll");
console.log(babyGirl.play());
