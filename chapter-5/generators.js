// 1.
// Write iterator function for an array that returns each value of the array when called,
// one element at  a time
// const returnIterator = (arr) => {
//     // ... your code here
// };

// const array2 = ["a", "b", "c", "d"];
// const myIterator = returnIterator(array2);

// console.log(myIterator.next().value); // -> should log [0, 'a']
// console.log(myIterator.next().value); // -> should log [1, 'b']
// console.log(myIterator.next().value); // -> should log [2, 'c']

// ---------------------------------------------------------------------------
// Solution

const returnIterator = (arr) => {
  let index = 0;
  return {
    next: function () {
      return {
        value: index < arr.length ? [index, arr[index++]] : undefined,
        done: index > arr.length,
      };
    },
  };
};

// 2.
// Create an iterator that returns each word from a string of words on the call of its .next method (hint: use regex!)
// Then attach it as a method to the prototype of a constructor Words. Hint: research Symbol.iterator!
// function Words(string) {
//     this.str = string;
// }
// ... your code here

// ---------------------------------------------------------------------------
// Solution

function Words(string) {
  this.str = string;
}

function wordsIterator() {
  let index = 0;
  const wordsArray = this.str.split(/\s+/);
  return {
    next: function () {
      return {
        value: index < wordsArray.length ? wordsArray[index++] : undefined,
        done: index > wordsArray.length,
      };
    },
  };
}
Words.prototype[Symbol.iterator] = wordsIterator;

const str = "zero one two three four five six seven eight nine ten";
const instance = new Words(str);
const instanceIterator = instance[Symbol.iterator]();

console.log(instanceIterator.next()); // -> "zero"
console.log(instanceIterator.next()); // -> "one"
console.log(instanceIterator.next()); // -> "two"

// or
// Words.prototype[Symbol.iterator] = function* () {
//   const arr = this.str.split(" ");
//   for (let i = 0; i <= arr.length; i++) {
//     yield arr[i];
//   }
// };
// const w = new Words(str);
// for (let word of w) {
//   console.log(word);
// }

// 3.
// Write a function that will console.log "hello there", or "bye",
// every three seconds depending on if the word passed into the function is 'english'.
// Do not use any type of loop constructor and only make the call to createConversation once.
// function* createConversation(str) {
//    ... your code here
// }
// ... your code here

// ---------------------------------------------------------------------------
// Solution

function* createConversation(str) {
  if (str == "english") {
    console.log(Math.random() < 0.5 ? "hello there" : "bye");
    yield setInterval(() => {
      console.log(Math.random() < 0.5 ? "hello there" : "bye");
    }, 3000);
  }
}
const id = createConversation("english").next().value; // every three seconds prints: "hello there", or "bye"
// console.log(createConversation("spanish").next()); prints once: { value: undefined, done: true }
setTimeout(() => {
  console.log("Removing setInterval!");
  clearInterval(id);
}, 9000); // clear interval after 9 seconds

// 4.
// Write a generator function which takes 3 arguments` start, end, step,
// and gives back values in range [start, end], incrementing by "step".
// function* rangeIter(start, end, step) {
//     // ... your code here
// }
// ... your code here

// ---------------------------------------------------------------------------
// Solution

function* rangeIter(start, end, step) {
  const maxCount = (end - start) / step;
  let index = 0;

  while (index <= maxCount) {
    yield start + index * step;
    index++;
  }
}
// or
// function* rangeIter(start, end, step) {
//   for (let i = start; i < end; i += step) {
//     yield i;
//   }
// }

const numGenerator = rangeIter(3, 10, 3);

for (let item of numGenerator) {
  console.log(item);
}

// 5.
// Write a function which takes an array as argument and removes duplicates from that array
// function removeDuplicates(arr) {
//     ... your code here
// }
// ... your code here

// Ex: [1, 2, 2, 3] --> [1, 2, 3]
// [1, 1, 1] --> [1]

// ---------------------------------------------------------------------------
// Solution

function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}
console.log(removeDuplicates([1, 2, 2, 3])); // -> [1, 2, 3]
console.log(removeDuplicates([1, 1, 1])); // -> [1]

// 6.
// Write a function which takes an array with length "n" as argument and
// swaps 1st and nth, 2nd and (n-1)th and so on items.
// function swapArray(arr) {
// ... your code here
// }
// ... your code here
// Ex: [1, 2, 3, 4] --> [4, 3, 2, 1]
// [1, 2, 3, 4, 5] --> [5, 4, 3, 2, 1]

// Solution

function swapArray(arr) {
  const copy = [...arr];
  // 1
  // return copy.reverse();
  // 2
  const length = arr.length;
  for (let i = 0; i < length / 2; i++) {
    const tmp = copy[i];
    copy[i] = copy[length - 1 - i];
    copy[length - 1 - i] = tmp;
  }
  return copy;
}

console.log(swapArray([1, 2, 3, 4])); // --> [4, 3, 2, 1]
console.log(swapArray([1, 2, 3, 4, 5])); // --> [5, 4, 3, 2, 1]

// 7.
// what will be the output, why ?

async function getData() {
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);

// ---------------------------------------------------------------------------
// Answer
/*
  As stated in the definition: 
    async function returns a new  Promise 
    which will be resolved with the value returned by the async function, 
    or rejected with an exception thrown from, or uncaught within, the async function. 
  So the output will be a new promise-object with 
    - fulfilled state (status: resolved)
    - and with value "I made it!" (The resolved value of the promise is treated as the return value of the await expression)
*/

// 8
// what will be the output, why ?

const myPromise = () => Promise.resolve("I have resolved!");

function firstFunction() {
  myPromise().then((res) => console.log(1, res));
  console.log("first");
}

async function secondFunction() {
  console.log(2, await myPromise());
  console.log("second");
}

firstFunction();
secondFunction();

// ---------------------------------------------------------------------------
// Answer
/*
  The order of execution of the console.log statements is shown below:
    console.log("first");
    console.log(1, res);                 // where 'res' will be: "I have resolved!"
    console.log(2, await myPromise());   // 'await myPromise()' will return: "I have resolved!"
    console.log("second");
*/
