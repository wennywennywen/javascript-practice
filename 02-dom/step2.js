//Basic understanding of DOM 
//Your index.html file on disk never changes. Ever.
// HTML need to include this line so it can read JS <script src="js/step2.js" defer></script></body>
// Here's the actual sequence:
    // Browser reads index.html once
    // It builds an in-memory tree of objects from that text — that tree is the DOM
        // Your webpage is text, but JS can only touch objects. 
        // Something has to convert one into the other.
        // That's what the browser does when it opens your HTML file. 
        // It reads the text once, and for every tag it sees, it builds a matching object in memory 
        // — <h1>Hello</h1> becomes an object you can grab and say h1.textContent = "New text" on. 
        // That whole collection of objects is the DOM.



let tasks = [];

function addTask(tasks, text) {
  if (text.trim() === "") return tasks;   // ← bail out, nothing else in here

  const ids = tasks.map(task => task.id);
  const newTask = { id: Math.max(0, ...ids) + 1, text, done: false };
  return [...tasks, newTask];
  //So [...tasks, newTask] means: a new array containing everything currently in tasks, then one more item.
}

function formatTask(tasks){
    return `[${tasks.done ? 'x' : ' '}] ${tasks.text}`
}

function renderTasks(tasks){
    return tasks
        .map(task =>  `<ul class = "task"> ${formatTask(task)} <button class = "del-btn" data-id="${task.id}">Delete</button> <button class = "tog-btn" data-id="${task.id}">Toggle</button></li>`)
        //where does task.id come from? its from the addTask above with task => task.id
        //want to see the whole list of array containing all the id and done stuff? type tasks in console 
        .join("");
}

function renderPage(tasks){
    return `<h2>${summary(tasks)}</h2><ul>${renderTasks(tasks)}</ul>`
}

function summary(tasks){
    const doneCount = tasks.filter(task => task.done).length;
    return `<h2 class = "summary"> ${doneCount} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} done </h2>`;
    //IMPORTANT!! always add class DIRECTLY into the line like this for css
}

function removeTask(tasks, id){ 
    return tasks.filter(task => task.id != id)
}

function clearCompleted(tasks){
    return tasks.filter(task => task.done != true)
}

function toggleTask(tasks, id){
    return tasks.map(task => task.id === id
        ? { ...task, done: !task.done }
        // which is equivalent to { id: task.id, text: task.text, done: !task.done }
        : task
        // REMEMBER THE ? : combo for ${task.done ? 'x' : ' '}
);
}


//A1. Grab an element
const app = document.querySelector("#app");
const app2 = document.querySelector("#app2");
console.log(app);
// querySelector = grabbing the element from html with the id = app

//### A2. The null case

//prediction, both printing null because the id is not exist

//### A3. Change text
const heading = document.querySelector("h1");   // select it
heading.textContent = "Uyen's 2026 Resolution";           // change it
console.log(heading)
// textContent = read and write new element object

//### A4. Insert HTML
//app.innerHTML = "<li>test</li>";
//innerHTML = adding more line into the HTML file

//### A5. `textContent` vs `innerHTML`
//app.textContent = "<b>hello</b>";
//app2.innerHTML  = "<b>hello</b>";
//console.log(app);
//console.log(app2);
//*textContent shows the tags as literal text
//innerHTML renders bold.
//the rule is `textContent` for plain text, 
// `innerHTML` only for HTML you generated yourself.

//### A6. Select many
const items = document.querySelectorAll("li");
console.log(items); 
// this create a Nodelist that forEach works directly but not map, filter, find etc
// so we have to use the spread [...items] for other method
console.log(items.length);
//console.log(items.map(x => x)); is INCORRECT THE LINE BELOW IS THE ANSWER
//items.map is not a function. (In 'items.map(x => x)', 'items.map' is undefined)
console.log([...items].map(li => li.textContent));
console.log(items.forEach(li => console.log(li.textContent)));

//### B1. React to a click //### B2. Read the input
const button = document.querySelector("button");
button.addEventListener("click", () => {
  console.log("clicked");
});
//addEventListener(**when**, **what**)
//"click" is the first argument, it is a fixed vocabulary the browser knows 
//() => {..} is the second argument, its the callback so instead of task => task > ... it turns to () to show that the parameters are optional

//### B2. Read the input
const input = document.querySelector("#task-input");
//button.addEventListener("click", () => {
//  console.log(input.value);
//});
// NEW! .value means printing for only INPUT this is different from .textContent
// since input in html is a self-closing tag, the input user typed wont live in the html so we need to use .value
// always return a string even with a number

//### B3. Guard it
//button.addEventListener("click", () => {
//    if (input.value.trim() === "") return;
//  console.log("adding", input.value);
//});
//safeguard value input with .trim()
//put just return and nothign after FOR JUST RETURNING NOTHING

//### B4. Clear the input & ### B5. Form submit — the one that trips everyone
//### C1. Bridge to the page and ### C2. Close the loop 
const form = document.querySelector("#task-form");
// make sure to realize the event listener we add later only belong to this specific form element so we have to define it first
function render() {
  document.querySelector("#app").innerHTML = renderPage(tasks);
}
form.addEventListener("submit", (e) => {
    // BE CAREFUL. "submit" and "adding" are different element here, 
    // NEW! "submit" allow the submission through pressing Enter and clicking the button
    // "click" is for allowing the action to go through by clicking only
  e.preventDefault();
  // NEW! e.preventDefault() is for stopping the default to keep deleting the input after submitted, lol what a contradicting tasks
      // be careful with the e!!!!!! its a name of the event
  console.log("adding", input.value);
  tasks = addTask(tasks, input.value);
  //check addTask above we defined as addTask(tasks, text)
  //why tasks = this is from renderPage(tasks) in line 140
  render();
  input.value = "";
  //check .value notes from line 120
  // the input.value = "" is for returning the value back to "" and clearing the input
      //  if (input.value.trim() != "") return input.value = "";
      // above is my first thought but statemetns inside a function always run top to bottom in order automatically already no need for if
});

//### C1. Bridge to the page 
//function render() {
// document.querySelector("#app").innerHTML = renderPage(tasks);}
// querySelector identifies the destination. 
// renderPage turns the tasks into an HTML string. (format the input of the task into HTML form, which is written down below)
// Assigning the HTML string to innerHTML makes the browser build real elements inside the destination identified above

//### C2. Close the loop 
// tasks = addTask(tasks, input.value);
// render();
// NEW!!! just render() to call the function no need for console.log because the output is going to the page and not the console

//### D1. See the problem first
//document.querySelectorAll("button").forEach(btn => {
//  btn.addEventListener("click", () => console.log("delete clicked"));});
// well its kinda obvious but by this stage the delete button is created but no delete event is added yet
// the Add button is now doing all three jobs from B1, B4 and D1 which return clicked delete clicked adding - ""

//### D2. Put the id in the HTML 
//Done above

//### D3. Event delegation
document.querySelector("#app").addEventListener("click", (e) => {
  console.log(e.target);
});

//e.target is the element that was actually clicked, the one under your pointer
//why .target here and not for the C1 and C2
    //in line 139 function render(), innerHTML = ... throws away all of #app's contents and builds fresh elements from your input
    //line 172-173 : These attach listeners to button elements. 
        // Delete buttons live inside <div id="app"></div> from renderTask when map add delete button to each line in <div id="app"></div> 
        // so line 139 destroys delete button and create new line in <div id="app"></div>
        //since listener from line 172 is destroyed, line 182 add listener for the new line that just got built from line 139
        //line 182 e.target then tells you which button it actually started at.
            //Without it, the handler only knows "a click happened somewhere inside #app"
    //IMPORTANT DIFFERENCE
        //// line 139 — WRITING to #app
        // document.querySelector("#app").innerHTML = renderPage(tasks);
        //                              ↑ output: your data goes onto the page
        // line 182 — LISTENING to #app
        // document.querySelector("#app").addEventListener("click", (e) => { ... });
        //                              ↑ input: the user's clicks come back to your code
    //IMPORTANT CONCEPT : EVENT DELEGATION 
        //Attaching one listener to an ancestor element, and using e.target to work out which one was involved.
        //what render() builds 
            //div#app                    ← your listener (line 182)
            // └── ul
                // └── li
                    // └── button         ← the click starts here
        //Ancestor = anything that contains it, at any level up: the li is its parent, the ul its grandparent, #app above that, then body, then html.
        //A click on that button bubbles through every one of them on its way up. So a listener on any of them would hear it.
        //Why #app specifically — it's the closest ancestor that satisfies both conditions
            //It survives every render. innerHTML replaces its contents, not the element itself. The ul and li are destroyed each time
            //You could listen on body or document — bubbling goes all the way — but then you'd hear clicks on the heading, the form, the Add button, everything on the page.
        //So the rule for picking the element: the nearest ancestor that your rendering never destroys. 

    //IMPORTANT TIMELINE 
        //page load    → line 172 runs (top level)
        //             → line 139 skipped (inside a function nobody called yet)
        //user submits → handler runs → calls render() → NOW line 139 runs
        //so technically we dont need line 172-173

//### D4. Delete a task
//document.querySelector("#app").addEventListener("click", (e) => {
//    const buttonid = Number(e.target.dataset.id)
//    if (e.target.classList.contains("tog-btn")){
//        tasks = toggleTask(tasks, buttonid)
        //NEW! classList will show you this DOMTokenList {0: "del-btn", length: 1, value: "del-btn", item: function, contains: function, add: function, …}
        //0: "del-btn", length: 1, value: "del-btn" these will only appears when you add class = "" to the HTML 
        //then use contains("") to check if actually the delete button is clicked
        //IMPORTANT! dont forget .target to specify which one was clicked
        //IMPORTANT! contains() will return true or false already so you only need ! in front of the callback to check 
//    }
    //<button class="del-btn" data-id="3">delete</button>
    //button.dataset          // { id: "3" }
    //button.dataset.id       // "3"
    //The browser reads the element's attributes, picks out the ones starting with data-, and assembles them into an object:
//    if (e.target.classList.contains("del-btn")){
//        tasks = removeTask(tasks, buttonid)
//    }
//    render();
    //render here is to update any new writing into the #app so the change is visible on screen 
//});

//### D5. Toggle done
//included above

//### D6. `closest()`
//When you click, the browser does a hit test: it finds every element covering that pixel and picks the deepest one. 
//That element becomes e.target, and the event starts its journey there.
//#app
//└── ul
    //└── li
        //└── button          ← covers those pixels
            //└── span        ← ALSO covers them, and it's deeper
                //↑ you clicked here
//closest() fixes this by ignoring where the event started and asking instead: "walking up from here, what's the first .del-btn?" 
document.querySelector("#app").addEventListener("click", (e) => {
    const delbtn = e.target.closest(".del-btn");
    //no need to use .contain like D4 but ALWAYS use .closest like this
    if (delbtn) {
        const delbuttonid = Number(delbtn.dataset.id);
        tasks = removeTask(tasks, delbuttonid)
        render();
        return;
    }

    const togbtn = e.target.closest(".tog-btn")
    if (!togbtn) return;
    const togbuttonid = Number(togbtn.dataset.id);
    tasks = toggleTask(tasks, togbuttonid)
    render();
})
//IMPORTANT! how to do branching!!!!!, when there are two branches, the first block has to contain RETURN!!!
//if (!x) return;      // "x is required" — only for a single path
//if (x) { ...; return; }   // "if it's x, handle it and stop" — for branching
























