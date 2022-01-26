// 1
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(shape.diameter());
console.log(shape.perimeter());
/*
  - shape.diameter() -> here we have implicit binding, 
    so "this" keyword inside diameter() refers to the shape object.
  - shape.perimeter() -> it is also implicit binding, 
    but because perimeter() is declared as an arrow-function, 
    "this" inside it will refer to the uppermost executable context (global-context (window)),
    and there is no radius property there(undefined)
 */

// ======================================

// 2.
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b); // => true
console.log(a === b); // => false
console.log(b === c); // => false
/*
    When we declare a variable as a literal (let a = 3;) then we have a primitive variable:
    typeof a is ‘number’ 
    When we decler a variable with the 'new' keyword, then we have a reference type variable
    typeof b is ‘object’
 */

// ======================================

// 3.
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");

console.log(lydia);
console.log(sarah);

/*
  - const lydia = new Person("Lydia", "Hallie"); -> is an example of new binding
    When we call Person constructor-function with the new keyword,
    it creates a new object ("this" inside Person function refers to the newly created object),
    then assigns values of firstName and lastName keys our passed params respectively
    and returns that new object: return {firstName: "Lydia", lastName: "Hallie"}
    console.log(lydia); -> will print out the lydia object.
  - const sarah = Person("Sarah", "Smith"); -> here we call Person function as regular function
    and what happens here in this case is:
    we create a new 'firstName' property for global-object(window), 
    assign its value to firstName-param (the same for lastName),
    and return undefined(which is kept in sarah variable)
    When we console.log(sarah); we have undefined here(returned value from Person function) as expected
 */

// ======================================

// 4.
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("You are an adult!");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult.");
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
/*
    The data parameter is the address to the memory(heap) where the passed object is stored.
    Inside  if statement we are creating a new anonym object ({ age: 18 }) and comparing the address 
    of the newly created object with the param, they are always different addresses 
    even though they keep the same data.
    The same logic is true for 'else-if' too, we are comparing different memory addresses, 
    it doesn’t matter will we use == or === .
    So `Hmm.. You don't have an age I guess` will be printed into the console.
 */

// ======================================

// 5.
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // => 456

/*
    All object keys are strings. 
    When we pass an object as a key, the object's toString() will be called on it, 
    and the key will be stringified to [object Object].
    So what we have here is:
        a[‘[object Object]’] = 123;
    on the next line we override it like this:
        a[‘[object Object]’] = 456;

 */

// ======================================

// 6.
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);
/*
    counterOne is the reference to the memory where we keep the object of the class Counter.
    Then we assign that reference to another variable named counterTwo.
    Both they refer to the same object!
 */

// ======================================

// 7
const obj = {
  message: "Hello, World!",
  getMessage() {
    const message = "Hello, Earth!";
    return this.message;
  },
};
console.log(obj.getMessage()); // => Hello, World!

/*
    Here we have an example of implicit binding : obj.getMessage()
    getMessage() is a regular function(not an arrow-function)
    so "this" refers to the "obj" object 
 */

// ======================================

// 8.
function Pet(name) {
  this.name = name;
  this.getName = () => this.name;
}
const cat = new Pet("Fluffy");
console.log(cat.getName());

const { getName } = cat;
console.log(getName());

/*
    const cat = new Pet("Fluffy"); -> new binding!
    Then we call cat.getName()
    It is an example of implicit binding,
    but getName() is declared as an arrow-function,
    so it will look for its "this" in the declaration context: Pet function.
    No matter how we will call getName() function, it will always look for its "this" in its declaration context
    So 
        cat.getName() 
    or 
        const { getName } = cat;
        getName();

        wich is identical to 
            const bar = cat.getName;
            bar();

    are the same!
 */

// ======================================

// 9
const object = {
  message: "Hello, World!",
  logMessage() {
    console.log(this.message);
  },
};
setTimeout(object.logMessage, 1000);
/*
    There is no implicit binding in this case:
        object.logMessage is a reference to the memory where we store loggMessage() function
    setTimeout function accepts function reference as its first param, 
    and we pass a reference to it like this:

    const foo = object.logMessage;
    setTimeout(foo, 1000);
    
    Now it is obvious that foo is called with default binding,
    "this" refers to the global-context (it might be window),
    The window object in our case has no message property, so we have undefined printed out in the console
 */

// ======================================

// 10
const object = {
  who: "World",
  greet() {
    return `Hello, ${this.who}!`;
  },
  farewell: () => {
    return `Goodbye, ${this.who}!`;
  },
};
console.log(object.greet());
console.log(object.farewell());
/*
    object.greet() -> implicit binding, greet() is a regular function.(so "who" is "World")
    object.farewell() -> farewell() is an arrow-function.("who" is `${window.who}` which is undefined)
 */

// ======================================

// 11
var length = 4;
function callback() {
  console.log(this.length);
}
const object = {
  length: 5,
  method(callback) {
    callback();
  },
};
object.method(callback, 1, 2);

/*
    Function callback() is called with default binding so the result is 4
 */

// ======================================

// 12
const call = {
  caller: "mom",
  says: function () {
    console.log(`Hey, ${this.caller} just called.`);
  },
};

let newCall = call.says;

newCall();

/*
    Default binding. "this" refers to the global-context(window), so "caller" is undefined
 */

// ======================================

// 13.
function logThis() {
  console.log(this);
}

const myObj = {
  logThis,
};

myObj.logThis();

/*
    const myObj = {
        logThis: function () {
            console.log(this);
        },
    };
    myObj.logThis();
    Implicit binding, "this" refers to the myObj, which will be logged out
 */

// ======================================

// 14
function logThis() {
  console.log(this);
}

const myObj = {
  foo: function () {
    logThis();
  },
};

myObj.foo();

/*
    logThis() is called with default binding, so this will refer to the global-context(window)
 */

// ======================================

// 15
const logThis = () => {
  console.log(this);
};

const myObj = {
  foo: logThis,
};

myObj.foo();

/*
    logThis is an arrow-function declared in the global-context,
    so its "this" refers to the global-context(window)
 */

// ======================================
// 16
function logThis() {
  console.log(this);
}

const someObj = new logThis();
/*
    When we call function with the new keyword, "this" refers to the newly created object
    with the type of 'object' and it is the instance of that constructor-function,
    So in the console we will see an empty object which is an instance of logThis
 */
