// 1. Guess the output
function foo(a) {
  return function baz(b) {
    console.log(a);
  };
}
foo(0)(1);
/* 
    output will be: 0
    foo(0)(1)   is equivalent to
    const bar = foo(0);
    bar(1);

    We call foo function passing argument “0”. 
    foo function has one parameter with name “a” which will hold the passed value: 0 in this case.  
    That parameter “a” is accessible-visible for everyone within the foo function body!
    Then we declare a new baz function inside the foo, (baz also has access to the “a” param,
    it captures that value on its declaration time) and return it.
    When we call the baz() - it ‘remembers’ that value of “a” and prints it into the console.
*/
// ======================================

// 2.
let count = 0;
function foo() {
  if (count === 0) {
    let count = 1;
    console.log(count);
  }
  console.log(count);
}
foo();
/*
    output will be: 1
                    0
    At first, in the global scope we declare a count variable and assign it value 0.
    Inside the foo function we check if the value of that global-scope’s count variable 
    is equal to zero (yes, it is!).
    Next inside the 'if' body we declare a new variable with the same count name 
    and assign it value 1 (this count variable is accessible only inside the if body).
    We print that (1) value into the console.
    The next console.log(count) statement will look for variable with name count 
    and find it in the global scope, and will print its value(0) into the console
*/

// ======================================

// 3.
for (var i = 0; i < 3; i++) {
  setTimeout(function log() {
    console.log(i);
  }, 1000);
}
/*
    output will be: 3
                    3
                    3
    There are 3 different areas(or something like task-queue-types with ascending priority listed below) in event loop:
    1 - main stream or synchron code execution
    2 - microtasks (Promises, …)
    3 - macrotasks (setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, …)
    The for loop is in main stream, so it will be executed first and in the end we will have i with value 3
    Then engine will look into microtasks(it is empty in this case), 
    then - macrotasks, and will find here 3 setTimeout() functions waiting for execution 
    (we had set them during for loop each itaration)
    Engine will wait 1000 milliseconds and then execute the first setTimeout(), 
    then the second setTimeout() and then the third one.
    Inside each setTimeout we have RHS ref to variable i. 
    Variable i was declared with keyword var in the global scope, 
    so we will get the current value of i which is 3.
*/

// ======================================

// 4.
function createIncrement() {
  let count = 0;
  function increment() {
    count++;
  }

  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }

  return [increment, log];
}

const [increment, log] = createIncrement();
increment();
increment();
increment();
log();
/*
    output will be: Count is 0

    The message variable was declared and initialized when we call createIncrement(), 
    so it holds `Count is 0`
*/
// ======================================

// 5.
function createStack() {
  return {
    items: [],
    push(item) {
      this.items.push(item);
    },
    pop() {
      return this.items.pop();
    },
  };
}

const stack = createStack();
stack.push(10);
stack.push(5);
console.log(stack.pop()); // => 5

// UNSAFE ACCESS
console.log(stack.items); // => [10]
// UNSAFE ACCESS
stack.items = [10, 100, 1000];

// Solution
function createStack() {
  const items = [];
  return {
    push(item) {
      items.push(item);
    },
    pop() {
      return items.pop();
    },
    getItems() {
      return items;
    },
  };
}

const stack = createStack();
stack.push(10);
stack.push(5);
stack.getItems(5); // => [10, 5]
stack.pop(); // => 5
stack.items; // => undefined

// ======================================

// 6.
function sum(num1, num2) {
  // Write your code here...
}

sum(4, 5); // => 9
sum(3, 3); // => 6
const double = sum(2);
double(5); // => 7
double(11); // => 13

// Solution
function sum(num1, num2) {
  const argsLength = arguments.length;
  if (argsLength === 1) {
    return function baz(n) {
      return num1 + n;
    };
  }
  if (argsLength === 2) {
    return num1 + num2;
  }
}

// or

function sum(...args) {
  const argsLength = args.length;
  if (argsLength === 1) {
    return function baz(n) {
      return num1 + n;
    };
  }
  if (argsLength === 2) {
    return num1 + num2;
  }
}
