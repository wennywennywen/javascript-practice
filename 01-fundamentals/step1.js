//### A1. Prediction drill Write your guess as a comment next to each line, then run all of them.

// console.log("5" + 3);
// console.log("5" - 3);
// console.log("5" * "2");
// console.log(5 + 3 + "1");
// console.log("1" + 5 + 3);
// console.log(Number("42"));
// console.log(Number("42abc"));
// console.log(Number(""));
// console.log(parseInt("42abc"));
// console.log(typeof "5", typeof 5);

//Answer
//53
//2
//10
//531 -> 81, + consider from left to right, either a string then + mean join
//153 
//42
//42abc -> NaN, all-or-nothing
// -> 0, empty gives 0
//42
//string -> string, number, two arguments separated with the , there so two answers

//### A2. `addNums(a, b)` 
// `addNums("5", "3")` → `8` (not `"53"`). 
// *Convert before adding. `Number()` is the tool.*

function addNums(a,b){
    const x = Number(a)
    const y = Number(b)

    return x + y
}

console.log(addNums("5","3"))

//### A3. `sumAll(values)` 
// `sumAll(["1", "2", "3"])` → `6`
// *An array of strings, as if from three form inputs. `.map` to convert, then sum. Do the sum however you like — loop or `.reduce`.*


function sumAll(values){
    const nums = values.map(Number) //THIS THIS THIS

    let total = 0;
    for (let i=0; i < nums.length; i++){
        total = total + nums[i]  
    }

    return total;
}

console.log(sumAll(["1","2","3"]))

//### A4. `parsePrice(str)` 
// `parsePrice("$4.50")` → `4.5` (a number, not a string)
// *Strip the `$` first — look up `.slice(1)` or `.replace("$", "")`. Confirm with `typeof` that you got a number.*

function parsePrice(str){
    const nosymbol = str.replace("$", "")
    const price = Number(nosymbol)
    return price
}

console.log(parsePrice("$4.50"))

//### A5. `isValidNumber(str)` 
// `isValidNumber("42")` → `true`, `isValidNumber("abc")` → `false`, `isValidNumber("")` → `false`
// *`Number("abc")` gives `NaN`. The trap: `NaN === NaN` is `false` — run it and see. So you can't test for it with `===`. Look up `Number.isNaN()`. Also decide what `""` should do — `Number("")` is `0`, which is probably not "valid" for your purposes.*

function isValidNumber(str){
    if (str.trim() === "") return false
    // check if the str is blank or not first because a blank wont return NaN by using trim to remove whitespace from both ends
    if (Number.isNaN(Number(str))) return false 
    // Number.isNaN is global already understand that it is like that
    //remember still to use Number(str) 
    return true
}

console.log(isValidNumber("  "))


//### A6. `toFixed` gotcha

const total = 4.5;
console.log(total.toFixed(2) + 1);
console.log(typeof total.toFixed(2) + 1);

//*Predict, then run. Why? What does `.toFixed()` actually return? Check with `typeof`.*
//typeof show that 4.5 is string so answer turn 4.501 by joining 1 into the 4.50
// .toFix convert everythign to string, 
// only use this at the end of the calculation to show the answer not adding another calculation after it like + 1 like that


//### B1. Prediction drill

if ("")        console.log("empty string is truthy"); //no print
if (0)         console.log("zero is truthy"); //print -> no print
if ([])        console.log("empty array is truthy"); //no print -> print
if ({})        console.log("empty object is truthy"); //no print -> print
if ("0")       console.log("string zero is truthy"); //print
if (null)      console.log("null is truthy"); //no print
if (undefined) console.log("undefined is truthy"); //no print

//There are only six falsy values:
// false   null   undefined   NaN especially  0  and ""  NO PRINT, [] {} empty is still something the container exist

//### B2. Prediction drill — `&&` and `||`

console.log(true && "yes");
console.log(false && "yes");
console.log("" || "default");
console.log("hello" || "default");
console.log(0 || "default");
console.log("" ?? "default");
console.log(0 ?? "default");
console.log(null ?? "default");

//LEARNED
//one thing is that 0 and "" or the same
//&& mean if a is true then move on to the next one to return, a is false then stop at a 
//|| mean the first choice is true then return right away

//&& means and, || means or, ?? means || but include 0 and ""
//-> operator	returns
// true && "yes"
    // "Is the left truthy? 
    // Yes. So I still don't know the answer — it depends on the right. 
    // Go look at the right, and hand back whatever I find there." → "yes"
// false && "yes"
    //"Is the left falsy? 
    // Yes — then the whole thing is already false no matter what's on the right. 
    // Stop. Hand back the left." → false
// "hello" || "default"   
    // left is truthy → answer already decided → return "hello"
// a ?? b	b only if a is null or undefined

//### B3. `displayName(user)`

function displayName(user){
    return user.nickname || user.name || "anoymous"
}

console.log(displayName({ nickname: "uy", name: "uyen" }))

//### B4. `isBlank(str)`
function isBlank(str){
    if (str.trim() === "") return true 
    return false
}

console.log(isBlank("")) //its true its blank
console.log(isBlank("   ")) //its true its blank
console.log(isBlank("hi")) //its not true theres word
console.log(isBlank("0")) //its not true theres word

//### B5. `addTask(tasks, text)` — guard clause version

function addTask(tasks, text){
    if (text.trim() === "") {
        return tasks
    }
    tasks.push(text);
    return tasks 
}
// push is for adding more item into an array
// return and push can never be on the same line separate like that

console.log(addTask(["a"], "    "))

//### B6. Safe access

const user = { profile: { city: "hanoi" } };
const empty = {};

// fix 1 — && (older style)
//console.log(empty.profile && empty.profile.city);   // undefined
//console.log(user.profile && user.profile.city);     // "hanoi"

console.log(empty.profile?.city);   // undefined
console.log(user.profile?.city);    // "hanoi"

//empty ={} is already containing all the falsy one
    // use && to stop at the first left since empty.profile will return undefined, but empty.profile.city give crashing
//user.profile && user.profile.city = user.profile?.city
    //if there is a profile look into and get me the city


//### B7. `summary(tasks)` revisited
const tasks = [
  { text: "buy milk",  done: false },
  { text: "study js",  done: true  },
  { text: "call mum",  done: false },
];

function summary(tasks){
    if (tasks.length === 0){
        return "no tasks yet"
    }
    const doneCount = tasks.filter(task => task.done).length;
    return `${doneCount} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} done`;
}
console.log(summary(tasks))


//### C1. Prediction drill
const nums = [1, 2, 3];
const a = nums.map(n => n * 2);
const b = nums.forEach(n => n * 2);
console.log(a);
console.log(b);
// forEach when you want something to happen → printing, attaching click handlers, saving to a database

//### C2. `logTasks(tasks)`

function formatTask(task){
    return `[${task.done ? 'x' : ' '}] ${task.text}`
}

console.log(formatTask(tasks[0]))

function logTasks(tasks) {
  tasks.forEach(task => console.log(formatTask(task)));
  //this is the format for forEach no need RETURN 
}

logTasks(tasks);

// look at logTasks here!!!! 
// it loops the array and calls the other forEach and console.log on each item

//### C3. `countDone(tasks)` with `forEach`

function countDone(tasks){
    let count = 0; //whenever compounding like count = count + 1 there has to be a let not CONST
    tasks.forEach(task => {
        if (tasks.done === true)
            count = count + 1});
            //if (task.done)              // about ONE task → inside the callback aka the bracket of forEach
            //if (tasks.length === 0)     // about the LIST → outside, at the top
            //its for each task if its done not the other ifs it done then for each task!!!
    return count
}

console.log(countDone(tasks));
// here countDone is COMPUTING a number or value so have to use the console.log   
// the logTasks is just a summary to print so it can stand alone like that

//### C4. When to use which — write the answers as comments
//answer 
//1. map
//2. forEach 
//3. forEach -> filter : picking out fewer item but same shape
//4. map -> find : exactly one item
//5. forEach

//### D1. `addTask(tasks, text)`
const tasks2 = [
  { id: 1, text: "buy milk", done: false },
  { id: 2, text: "study js", done: true  },
  { id: 3, text: "call mum", done: false },
];

function addTask(tasks2, text){
    const id = tasks2.map(task => task.id)
    // mapping the id separately from tasks2 so it will return into an array of id only
    const newTask = { id : Math.max(...id) + 1, text: text, done: false }
    //...id is caled a spread basically calling the whole array by just ...
    const tasks3 = [...tasks2, newTask]
    // or can also do tasks2.push(newTask)
    return tasks3
}
console.log(addTask(tasks2, "walk dog"))

//### D2. `removeTask(tasks, id)`
function removeTask(tasks, id){ 
    return tasks2.filter(task => task.id != id)
}
console.log(removeTask(tasks2, 2))


//### D3. `toggleTask(tasks, id)`

// attempt 1
//function toggleTask(tasks, id){
//     const toggle = tasks.map(task => task.id === id)
//     for (let i=0; i < toggle.length; i++){
//         if (toggle[i] === true){
//             tasks[i].done = !tasks[i].done
//             return tasks}}}
//console.log(toggleTask(tasks2, 2))
//tasks[i].done = !tasks[i].done -> im just mutating it here not copying 

function toggleTask(tasks, id){
    return tasks.map(task => task.id === id
        ? { ...task, done: !task.done }
        // which is equivalent to { id: task.id, text: task.text, done: !task.done }
        : task
        // REMEMBER THE ? : combo for ${task.done ? 'x' : ' '}
);
}
console.log(toggleTask(tasks2, 1))

//### D4. `editTask(tasks, id, newText)`

function editTask(tasks, id, newText){
    return tasks.map(task => task.id === id
        ? { ...task, text : newText, done: !task.done }
        : task
);
}
console.log(editTask(tasks2, 1, "kill myself"))

//### D5. `clearCompleted(tasks)`

function clearCompleted(tasks){
    return tasks2.filter(task => task.done != true)
}
console.log(clearCompleted(tasks2))

//### D6. `toggleAll(tasks)`
// function toggleAll(tasks){ 
// return tasks.every(task => task.done === true
//         ? {...task, done: false}
//         : task    )}
// console.log(toggleAll(tasks2))

//.every() isn't a transformer — it's a question. It returns true or false, never an array

function toggleAll(tasks){
    const alldone = tasks.every(task => task.done === true)
    return tasks.map(task => alldone === false
        ? { ...task, done: true }
        : { ...task, done: false }
);   //THIS IS QUICKER return tasks.map(task => ({ ...task, done: !alldone }));
}
console.log(toggleAll(tasks2))

