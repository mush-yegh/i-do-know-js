// What will be the output, why ?

// 1.
console.log(10);

setTimeout(function () {
  console.log(20);
}, 1000);

setTimeout(function () {
  console.log(30);
}, 0);

console.log(40);

// Answer
/**
 * We will see in the console:
 *                              10
 *                              40
 *                              30
 *                              20
 * - console.log(10); -> is the first statement in synchron code flow, so it will be executed first
 * - then the first setTimout function will be executed, which will pass its callback to WEB-API,
 *      and the WEB-API will put that callback into the macrotask's queue  after one second.
 * - next the second setTimout will be executed, it will pass its callback to WEB-API, which will
 *      immediately put that callback into macrotask's queue. This one will be before
 *      of the first setTimout callback in the queue.
 * - console.log(40); -> is the next statement in synchron code flow.
 */

// 2.
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve("success");
});

promise1.then(() => {
  console.log(3);
});

console.log(4);

// Answer
/**
 * We will see in the console:
 *                              1
 *                              4
 *                              3
 * - const promise1 = new Promise(...) -> here we declare a new promise object named 'promise1',
 *      what is passed to its constructor will be executed as a normal synchron code.
 *      So "console.log(1);" will be excuted first,
 *      then  when we call "resolve("success");" -> we change promise1 status form "pending" to "resolved"
 * - promise1.then(), catch(), finally() are promise-object specific methods which are kept somewhere
 *      (they are hidden props of "promise1" object itself)
 *      and waiting to be notified about 'promise1' status change(either "fulfilled" or "rejected"),
 *      and when that change accurs, exactly on that moment their callbacks will be added into microtask's queue
 *      In this example it is not so important when will promise be settled, because synchron code execution
 *      has higher priority, so 'promise1.then(...)' will wait until the end of synchron code execution.
 * -  console.log(4); -> is the next statement of synchron code execution
 */

// 3.
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
});
promise1.then(() => {
  console.log(3);
});
console.log(4);

// Answer
/**
 * We will see in the console:
 *                              1
 *                              4
 *
 * - console.log(1); -> This one will be executed during "promise1" object creation
 * - console.log(3); -> will never be executed, ("promise1" is not resolved, the status is still "pending")
 * - console.log(4); -> is the next statement of our synchron code
 */

// 4.
const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve("resolve1");
});

const promise2 = promise1.then((res) => {
  console.log(res);
});

console.log("promise1:", promise1);
console.log("promise2:", promise2);

// Answer
/**
 * We will see in the console:
 *                              1
 *                              "promise1: [object Promise]" //status is "resolved"
 *                              "promise2: [object Promise]" //status is "pending", not resolved or rejected yet
 *                              "resolve1"
 *
 *  - console.log(1); -> executed first! Next we resolve "promise1" with an argument: "resolve1"
 *       and continue the code flow
 *  - when we meet promise1.then() on the next line it's callback will be immediately added into
 *        microtask's queue.
 *       promise1.then()  itself returns a promise-object
 *  - console.log("promise1:", promise1);
 *    console.log("promise2:", promise2);
 *      these two console.log statements will be excuted as a part of synchron code flow,
 *      and only then the execution flow will be transfered to the microtask's queue (where we have
 *      "console.log(res);"  stattement waiting for execution)
 *
 */

// 5.
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });

fn().then((res) => {
  console.log(res);
});

console.log(2);

// Answer
/**
 * We will see in the console:
 *                              1
 *                              2
 *                              "success"
 *
 * - Here we have declared an arrow-function which creates and returns a promise-object,
 *    when we call that function: fn(),
 *    console.log(1); -> will be executed first, then we resolve that newly created promise and return it,
 *    so the ".then()" of that promise will put its callback into the microtask's queue immediately (its
 *    status is "resolved")
 * - Next  console.log(2); will be executed.
 *      and now is the time to look into microtask's queue and execute what we have there: console.log(res);
 *
 */

// 6.
console.log("start");

setTimeout(() => {
  console.log("setTimeout");
});

Promise.resolve().then(() => {
  console.log("resolve");
});

console.log("end");

// Answer
/**
 * We will see in the console:
 *                              "start"
 *                              "end"
 *                              "resolve"
 *                              "setTimeout"
 * - console.log("start"); -> will be the first executed statement
 * - setTimeout(...)  -> we put the callback into macrotask's queue, we will come back here
 *    when synchron code execution will be completed and microstask's queue will be empty
 * - Promise.resolve().then(...) -> here we have resolved promise-object, and its then()'s callback
 *    will be put into microtask's queue
 * - console.log("end"); -> will be the second printed string in the console
 */

// 7.
const promise = new Promise((resolve, reject) => {
  console.log(1);

  setTimeout(() => {
    console.log("timerStart");

    resolve("success");

    console.log("timerEnd");
  }, 0);

  console.log(2);
});

promise.then((res) => {
  console.log(res);
});

console.log(4);

// Answer
/**
 * We will see in the console:
 *                              1
 *                              2
 *                              4
 *                              "timerStart"
 *                              "timerEnd"
 *                              "success"
 * - Here we declare a promise-object
 *    Inside it:
 *       - console.log(1); -> will be printed out into the console first
 *       - Next we have setTimeout(...), which will pass its callback to WEB-API,
 *          and WEB-API after zero milisecond will put received callback into the macrotask's queue
 *       - console.log(2); -> is the next statement which will be executed 
 * - promise.then(...); -> checks the status of "promise", it is still "pending", because we have to go 
 *    to the macrotask's queue and execute the callback of the setTimout() in order to change it to "resolved"
 * - console.log(4); -> is the next statement which will be executed 
 * - Now synchron code execution is completed, it is time to check microtask's queue
 *    Microtask's queue is empty, so let's go to the macrotask's queue.
 *    In the Macrotask's queue we have function reference like this:
 *      () => {
          console.log("timerStart");

          resolve("success");

          console.log("timerEnd");
        }
      So we will execute it and will get as a result:
        1) "timerStart" - printed out into the console.
        2) Our "promise" with status "resolved", we call resolve function with argument "success"
        3) "timerEnd" - printed out into the console.
    After all these steps(mentioned above), it is time to check again microtask's queue,
        and there we will find promise.then(...)  callback:
        (res) => {
          console.log(res);
        }
        which will be executed and will print out into the console its "res" parameter's value: "success"
 */

// 8.

const timer1 = setTimeout(() => {
  console.log("timer1");

  const timer3 = setTimeout(() => {
    console.log("timer3");
  }, 0);
}, 0);

const timer2 = setTimeout(() => {
  console.log("timer2");
}, 0);

console.log("start");

// Answer
/**
 * We will see in the console:
 *                              "start"
 *                              "timer1"
 *                              "timer2"
 *                              "timer3"
 * 
 * - On the first line we call setTimeout-function, pass to it a callback, and keep the returned id 
 *    in the variable named "timer1".
 *    setTimeout-function passes its callback to WEB-API, which will add that callback into the macrotask's queue
 *    after zero milisecond. 
 * - The same is for "timer2", it's callback will be added into the macrotask's queue right after "timer1"'s callback
 * - console.log("start"); -> is the first statement wich will print out into console it's argument: "start"
 * 
 *  Then we will check the microtask's queue - it is empty, and will go to the macrotask's queue
 *  In the macrotasks queue we have two callbacks, we will execute them in the order they were added there:
 *  1)
 *    () => {
        console.log("timer1");

        const timer3 = setTimeout(() => {
          console.log("timer3");
        }, 0);
      }
    2)
      () => {
        console.log("timer2");
      }

    "1)" prints out into the console "timer1",
        then calls setTimout-function, passes to it a callback, and keeps returned id in the "timer3" variable;
        That is all what "1)" callback does.
        SetTimout-function as we already know, passes it's callback to WEB-API, and WEB-API pushes that callback
          to the end of the macrotask's queue after zero milisecond in this case.
        Now "1)" is already executed and it doesn't exist in the macrotask's queue anymore, but "timer3"'s 
        callback is there right after the "2)"
    When one callback of the macrotask's queue is executed, the flow goes back to synchron code execution, 
    then to the microtask's queue and then comes back to the macrotasks again, 
    and executes the next callback, and so on ...

    So on the next cycle we will have "timer2" printed out, and then on the next cycle "timer3"
 */

// 9.
const timer1 = setTimeout(() => {
  console.log("timer1");
  const promise1 = Promise.resolve().then(() => {
    console.log("promise1");
  });
}, 0);
const timer2 = setTimeout(() => {
  console.log("timer2");
}, 0);
console.log("start");

// Answer
/**
 * We will see in the console:
 *                              "start"
 *                              "timer1"
 *                              "promise1"
 *                              "timer2"
 *
 *   --------------------------------TRACE TABLE-------------------------------------------- 
 * 
 *     JS execution stack        |        Microtasks         |      Macrotasks (Task queue)
 ------------------------------------------------------------|----------------------------------------------------
1                                |           EMPTY           |  () => {
                                 |                           |    console.log("timer1");
                                 |                           |    const promise1 = Promise.resolve().then(() => {
                                 |                           |        console.log("promise1");
                                 |                           |      });
                                 |                           |   };
                                 |                           |
                                 |                           |   () => {
                                 |                           |      console.log("timer2");
                                 |                           |    };
          console.log("start");  |                           |
---------------------------------|---------------------------|------------------------------------------------------
2                                |                           | [console.log("timer1"); -> is executed]
              EMPTY              |           EMPTY           | ["promise1"->is declared, and then() is called]
                                 |                           |
                                 |                           |    () => {
                                 |                           |      console.log("timer2");
                                 |                           |    };
                                 |                           |
---------------------------------|---------------------------|------------------------------------------------------
3             EMPTY              |  console.log("promise1"); |    console.log("timer2");
                                 |                           | 
--------------------------------------------------------------------------------------------------------------------
 */

// 10.
const promise1 = Promise.resolve().then(() => {
  console.log("promise1");
  const timer2 = setTimeout(() => {
    console.log("timer2");
  }, 0);
});
const timer1 = setTimeout(() => {
  console.log("timer1");
  const promise2 = Promise.resolve().then(() => {
    console.log("promise2");
  });
}, 0);
console.log("start");

// Answer
/**
 * We will see in the console:
 *                              "start"
 *                              "promise1"
 *                              "timer1"
 *                              "promise2"
 *                              "timer2"
 *
      Synchron code flow         |        Microtasks         |      Macrotasks
 --------------------------------|---------------------------|----------------------------------------------------
1                                |                           |
                                 | () => {                   |
                                 |  console.log("promise1"); |  
                                 |  const timer2 =           |   
                                 |   setTimeout(() => {      |   
                                 |    console.log("timer2"); |   
                                 |   }, 0);                  |
                                 | });                       |   
                                 |                           |  () => {
                                 |                           |    console.log("timer1");
                                 |                           |    const promise2 = Promise.resolve().then(() => {
                                 |                           |        console.log("promise2");
                                 |                           |      });
                                 |                           |  };
        [prints "start"]         |                           |
---------------------------------|---------------------------|------------------------------------------------------
2                                |  [prints "promise1"]      | 
              EMPTY              |                           |    [prints "timer1"]
                                 | () => {                   |
                                 |  console.log("promise2"); |   
                                 | });                       |      
                                 |                           |    () => {
                                 |                           |      console.log("timer2");
                                 |                           |    };
                                 |                           |   
---------------------------------|---------------------------|------------------------------------------------------
3             EMPTY              |  [prints "promise2"]      |    
                                 |                           |    [prints "timer2"]
--------------------------------------------------------------------------------------------------------------------
 
 */

// 11.
const promise1 = new Promise((resolve, reject) => {
  const timer1 = setTimeout(() => {
    resolve("success");
  }, 1000);
});
const promise2 = promise1.then(() => {
  throw new Error("error!!!");
});

console.log("promise1", promise1);
console.log("promise2", promise2);

const timer2 = setTimeout(() => {
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);

// Answer
/**
 * We will see in the console:
 *                              "promise1 [object Promise]" // status is "pending"
 *                              "promise2 [object Promise]" // status is "pending"
 * after 1 second "promise1" will be resolved
 * and then after 1 second
 *                              "promise1 [object Promise]" // status is "resolved"
 *                              "promise2 [object Promise]" // status is "rejected"
 */
