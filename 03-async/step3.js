//### A1. Objects are not text
const item = { id: 1, text: "milk", done: false };
console.log(String(item));
console.log(JSON.stringify(item)); 
//return [object Object]

//### A2. Round trip
//const items = [{ id: 1, text: "milk", done: false }];
//const text = JSON.stringify(items);
//const back = JSON.parse(text);

console.log(typeof text, typeof back); //return string object
console.log(back[0].text); //return milk
console.log(text === JSON.stringify(back)); //return true

//UNDERSTAND `stringify` object → string. `parse` string → object. 

//### A3. What survives the trip
const weird = {
  num: 1,
  str: "hi",
  bool: true,
  arr: [1, 2],
  nested: { a: 1 },
  fn: () => "hello",
  undef: undefined,
  date: new Date(),
};
console.log(JSON.parse(JSON.stringify(weird)));
//JSON has no concept of functions, `undefined`, or dates — it's text, and only understands
//strings, numbers, booleans, null, arrays and objects.

//### A4. Broken input
//console.log(JSON.parse("not json"));

//### A5. Pretty-printing
console.log(JSON.stringify(items, null, 2));
// the number 2 helped to make the array turn vertical with 2 indentations

//### B1. Set and get
//localStorage.setItem("name", "uyen");
console.log(localStorage.getItem("name"));

//### B2. It only stores strings
//localStorage.setItem("count", 5);
const n = localStorage.getItem("count");
console.log(n, typeof n);
console.log(n + 1);

//### B3. Storing an array
const items = [{ id: 1, text: "milk" }]
localStorage.setItem("items", JSON.stringify(items));
//IMPORTANT! setItem means = Turn that list into text (stringify), and save the text in the browser under the label "items".
const back = JSON.parse(localStorage.getItem("items"))
//IMPORTANT! Go get the text filed under "items", rebuild it into a real list, and call that list back.
console.log(back[0].text)
//UNDERSTAND! the four lines prove list → text → storage → text → list

//### B4. The missing key
console.log(localStorage.getItem("nothing-here"));
//return Null but we want an empty array

//### B5. Save and load in the tracker
//edit was made in app.js by adding the below
    // Read the saved array back out of storage.
    // getItem returns null on a first visit, and JSON.parse(null) is null,
    // so ?? [] gives an empty array instead of crashing everything downstream.
    function loadItems() {
    return JSON.parse(localStorage.getItem("items")) ?? [];
    }
    //DONT FORGET the ?? meaning use the right if the left is null or undefined
    //localStorage doesnt need "items" to be defined anywhere in the code it will create one when the label doesnt exit 

    function saveItems() {
    localStorage.setItem("items", JSON.stringify(tasks));
    }
    //IMPORTANT! saveItems() is added into the function render() so that every render call will also call saveItem into "items" in localstorage

    // Start from whatever was saved, instead of always starting empty.
    let tasks = loadItems();

//localStorage will only be stored on one browser and one device obvi

//C1
console.log("first");
setTimeout(() => console.log("second"), 1000);
console.log("third");
// the order return : first, third, second
// js will always run in order if something is slow, it handle that aside and running the rest of the code

//C2
let result;
setTimeout(() => { result = "done"; }, 100);
console.log(result);
//return undefined cus the console.log return quicker than the let

setTimeout(() => {
  result = "done";
  console.log(result);     // The fix is to move the code that *needs* the answer **inside** the thing that receives it:
}, 100);

//C3
const p = new Promise((resolve) => {
    setTimeout(() => resolve("your coffee"), 500);
});
//p is the receipt of coffee order
//resolve is a javascript function giving to you whatever inside the ""
//Promise is just saying whatever come after is still pending

//UNDERSTAND! resolve meaning like
//function makeCoffee(whenDone) {
//  setTimeout(() => whenDone("your coffee"), 500);}
//makeCoffee(value => console.log("got:", value));
//Promise or p is the makeCoffee here 
//whenDone is resolve meaning when the makeCoffee is done then consolelog this value into makeCoffee

console.log(p);
p.then(value => console.log("got:", value));
//value is whatever passed to resolve, when the value is ready take it and log got: value
console.log("after");

//C4
function later(value, ms) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function run() {
  console.log("start");
  const value = await later("your coffee", 500);
  console.log("got:", value);
}

run();
console.log("after run()");

//C5
async function run() {
  try {
    const value = await Promise.reject(new Error("it broke"));
    console.log("you never see this");
  } catch (err) {
    console.log("caught:", err.message);
  } finally {
    console.log("this runs either way");
  }
}
run();

//IMPORTANT! await mean stop here until this arrives, then give me the value.
    //async means a label on the function saying "this one may need to pause."
    //await must always stay inside a function with async 
//C5 is for - **`try`** — "attempt this; it might blow up"
    //- **`catch`** — "if it blew up, do this instead" (`err` holds what went wrong)
    //- **`finally`** — "do this whether it worked or not"

//C6
// A — one after the other
console.time("A");
const a = await later("one", 1000);
const b = await later("two", 1000);
console.timeEnd("A");

// B — both at the same time
console.time("B");
const [c, d] = await Promise.all([later("one", 1000), later("two", 1000)]);
console.timeEnd("B");

//in A, the second `await` doesn't even *start* until the first one has finished. 
//In B, `Promise.all` starts both at once and waits for both to finish. 


//D1 
async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  console.log(response);

  const data = await response.json();
  console.log(data);
}
getTodos();

//IMPORTANT! we need both await here since fetch and response,json() are slow responses

//D3
async function test() {
  const response = await fetch("https://jsonplaceholder.typicode.com/nope");
  console.log(response.ok, response.status);
}
test();

//D4
async function getTodos(){
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    if (response.ok){
        console.log(response);
        const data = await response.json();
        return data;
    }
    throw Error("something went wrong");
}
getTodos()
//can use try/catch with the same structure

//D5 and D6 
//make some edits in the app.js for adding the Loading phrase in renderPage
async function getTodos(){
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    if (!response.ok){
      throw new Error("something went wrong");
    }
    const data = await response.json();
    //.json is actually the same as JSON.parse by turning text from the fetch into object of string
    const translated = data.map(todo => ({
      id: todo.id,
      text: todo.title,
      done: todo.completed
    }))
    return translated 
}
//IMPORTANT! learn how to map the different shape of data using map

example.addEventListener("click", (e) => {
  loadExamples()
  return
})

render();

async function loadExamples() {
  if (loading) {
    return
  }

  try {
    tasks = await getTodos()     
  } 
  catch (err) {
    console.log("couldn't load:", err.message)
  } 
  finally {
    loading = false
    render()
  }
}
//create another function for loading example from the fetch 
//UNDERSTAND how translated are not turn into tasks by calling the function getTodos
//try/catch/finally for different level of roles then assign listener for the task

//D7
const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "buy milk", completed: false }),
});
console.log(await response.json());
//- **`method: "POST"`** — "I'm sending you something," rather than the default `GET`, meaning "give me something."
//- **`body`** — what you're sending. It has to be **text**, so `JSON.stringify` again. Section A is still earning its keep.
//- **`headers`** — a note attached to the request saying what kind of thing the body is. Without it the server doesn't know it's receiving JSON and may ignore it.
//IMPORTANT! always`JSON.parse` what you receive and `JSON.stringify` what you send. 
