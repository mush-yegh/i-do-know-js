// What will be the output in the console ? (1-6)
// Question 1
const hero = {
  powerLevel: 99,
  getPower() {
    return this.powerLevel;
  },
};

const myFn = hero.getPower;

const hero2 = { powerLevel: 42 };
console.log(myFn());
console.log(myFn.apply(hero2));
/*
    console.log(myFn()); -> default binding, so output is undefined (window.powerLevel)
    console.log(myFn.apply(hero2)); -> explicit binding, so we will have 42 in the console
 */

// Question 2
const a = function () {
  console.log(this);

  const b = {
    func1: function () {
      console.log(this);
    },
  };

  const c = {
    func2: () => {
      console.log(this);
    },
  };

  b.func1();
  c.func2();
};

a();

/*
    a();       -> The first console.log(this); will print out the window object, 
                  because function a is called in the global-scope with default binding
    b.func1(); -> implicit binding, output is the "b" object itself
    c.func2(); -> func2() is an arrow function, so it will look for its "this" in the upper scope,
                  in this example it will be the function "a" (the uppermost executable context)
                  where "this" refers to the window
 */

// Question 3
const b = {
  name: "My Name",
  myFn: function () {
    var self = this;

    console.log(this.name);

    (function () {
      console.log(this.name);
      console.log(self.name);
    })();
  },
};

b.myFn();

/*  
    console.log(this.name); (the first one in myFn) -> will print out "My Name" (implicit binding).
    inside IIFE 
      (function () {
        console.log(this.name);
        console.log(self.name);
      })();
    is the same as :
      function identical(){
        console.log(this.name);
        console.log(self.name);
      };
      identical();
    - console.log(this.name); -> Default binding, so window.name will be printed
    - console.log(self.name); -> self refers to the "b" object, because myFn() was called with explicit bindig,
                                 so self.name is "My Name"                   
*/

// Question 4
function saySomething(message) {
  return this.name + " is " + message;
}

const person4 = { name: "John" };

const result = saySomething.apply(person4, ["awesome"]);
console.log(result);
/*
    explicit binding, so "John is awesome"
*/

// Question 5
const obj = {
  name: "My Name 1",
  fn1: () => {
    console.log("fn1:", this);
  },
  fn2: function () {
    console.log("fn2:", this);
  },
};

const obj2 = {
  name: "My Name 2",
};

const exportedFn1 = obj.fn1;
const exportedFn2 = obj.fn2;

exportedFn1.call(obj2);
exportedFn2.call(obj2);

obj.fn1.call(obj2);
obj.fn2.call(obj2);

exportedFn1.bind(obj2);
exportedFn1();

/* 
    exportedFn1.call(obj2); -> exportedFn1 is an arrow-function, 
                            "this" inside it refers to the global context(window)
                            result will be:  "fn1:", window object
    exportedFn2.call(obj2); -> explicit binding, will print:  "fn2:", obj2 (wich is: {name: "My Name 2"})
    obj.fn1.call(obj2); 
        is the same as 
    exportedFn1.call(obj2);

    obj.fn2.call(obj2);
        is the same as 
    exportedFn2.call(obj2);

    exportedFn1.bind(obj2); -> it is an arrow-function, nothing has changed here
    exportedFn1(); -> the function called wuth default binding, but it is an arrow-function,
                      so its "this" refers to the window object
*/

// Question 6
var skill = 125;

function f() {
  const self = this;
  return {
    skill: 80,
    fn1: () => {
      console.log(self.skill);
    },
    fn2: function () {
      console.log(self.skill);
    },
  };
}

const obj = f();
obj.fn1(); // => 125
obj.fn2(); // => 125
/*
    
 */

// Question 7 - What will be the output of this code ? Change the code so it logs "My Name 1" into the console
function f(name) {
  this.myName = name;
  const self = this;
  function returnMe() {
    return self;
  }

  return {
    returnMe,
  };
}
const baz = new f("My Name 1");

baz.returnMe().myName; // => 'My Name 1'
/**
 *
 */

// Question 8 - Fix the code so correct data gets logged into the console
function MyConstructor(data, transport) {
  this.data = data;
  transport.on("data", function () {
    console.log(this.data);
  });
}

var transport = {
  on: function (event, callback) {
    console.log("event:", event);
    setTimeout(callback, 1000);
  },
};

var obj = new MyConstructor("foo", transport);

// Solution
function MyConstructor(data, transport) {
  this.data = data;
  transport.on("data", () => {
    console.log(this.data);
  });
}
