# Step 2 — The DOM

Your engine already works. This step connects it to a page a human can click.

**The one idea:** the DOM is just objects. `document.querySelector(...)` hands you an object,
you read and write its properties, and the browser redraws. Nothing new conceptually — you've
been reading and writing object properties since `task.done`.

## How to use this

Same as last time. Predict, run, post in batches, I only tell you what's wrong.

One difference: `console.log` now prints in the **browser's** console, not the terminal.

---

# Step 0 — Setup (do this first, it's the blocker)

You have no HTML file. Nothing else works until you do.

### 0.1 Create the files

```bash
touch index.html
touch js/app.js
```

Note `index.html` goes in the project root, not in `js/`.

### 0.2 Paste this into `index.html`

This is scaffolding, not an exercise — HTML isn't what you're learning here.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo</title>
</head>
<body>
  <h1>My Tasks</h1>

  <form id="task-form">
    <input id="task-input" type="text" placeholder="What needs doing?">
    <button type="submit">Add</button>
  </form>

  <div id="app"></div>

  <script src="js/app.js" defer></script>
</body>
</html>
```

Four things to notice:

- **`id="app"`** — an empty container. Your rendered HTML goes in here.
- **`<script src="js/app.js">`** — loads your JS. The path is relative to the HTML file.
- **`defer`** — "run this after the HTML is parsed." **Remove it and `querySelector` returns
  `null` for everything**, because the script runs before the elements exist. This is the
  single most common DOM bug for beginners. Try deleting it once, on purpose, to see the
  failure — then put it back.
- **`type="submit"`** on the button, inside a `<form>`. This matters in B5.

### 0.3 Copy your engine into `js/app.js`

All eight functions from `todo.js`: `addTask`, `removeTask`, `toggleTask`, `clearCompleted`,
`formatTask`, `renderTasks`, `renderPage`, `summary`.

Delete the driver script at the bottom — the `tasks = addTask(...)` lines. Keep
`let tasks = [];`.

### 0.4 Open it

Double-click `index.html` in Finder, or:

```bash
open index.html
```

Then open the browser console: **Cmd + Option + J** in Chrome. That's where your
`console.log` output goes now.

**Better option:** install the **Live Server** extension in VS Code, then right-click
`index.html` → "Open with Live Server". It reloads the page automatically every time you
save. Without it you're hitting Cmd+R constantly.

### Done when
`console.log("hello")` at the top of `app.js` shows up in the browser console.

---

# Section A — Reading and writing the DOM

### A1. Grab an element
```js
const app = document.querySelector("#app");
console.log(app);
```
*`#app` means "the element with id `app`" — same syntax as CSS. Expand the logged object in
the console and poke around; it's an ordinary object with a lot of properties.*

### A2. The null case
```js
console.log(document.querySelector("#does-not-exist"));
console.log(document.querySelector("#does-not-exist").textContent);   // predict first
```
*Predict both. The second is B6 from the last step, in its natural habitat: `querySelector`
returns `null` when nothing matches, and reaching into `null` throws. You will hit this every
time you typo a selector — learn to recognise the error message now.*

### A3. Change text
Set the `<h1>`'s text to something else.
*Select it, then assign to `.textContent`. Assignment, not a method call — `el.textContent =
"new"`, no parentheses. The page updates the instant that line runs.*

### A4. Insert HTML
```js
app.innerHTML = "<li>test</li>";
```
*Look at the page, then right-click → Inspect. A real `<li>` element now exists in the
document — the browser parsed your string into actual elements.*

### A5. `textContent` vs `innerHTML`
Set both to the same string and compare:
```js
someElement.textContent = "<b>hello</b>";
someElement.innerHTML  = "<b>hello</b>";
```
*One shows the tags as literal text, the other renders bold. Work out which and why.*

*Then the security point: if that string came from a user typing into your input,
`innerHTML` would run any `<script>` they typed. That's an XSS vulnerability, and it's why
the rule is **`textContent` for plain text, `innerHTML` only for HTML you generated
yourself.** Your `renderPage` output is yours, so it's fine.*

### A6. Select many
Put three `<li>` elements in `#app` first, then:
```js
const items = document.querySelectorAll("li");
console.log(items);
console.log(items.length);
```
*`querySelectorAll` returns **all** matches, not one. It's a NodeList — array-*like*, with
`.length` and `.forEach`, but no `.map` or `.filter`. Try `items.map(...)` and read the
error. To get a real array: `[...items]` — the spread you already know.*

*Then use `.forEach` to log each one's `textContent`. That's C4 question 5 from last step,
for real.*

---

# Section B — Events and input

### B1. React to a click
Select the Add button, attach a click listener, log something.
```js
button.addEventListener("click", () => {
  console.log("clicked");
});
```
*Read the shape: `addEventListener` takes two arguments — the event **name** as a string, and
a **callback**. You've passed callbacks to `map` and `forEach`; this is the same thing. The
difference: `forEach` calls yours immediately, three times. This one gets stored and called
later, whenever the user clicks. Maybe never.*

### B2. Read the input
Log `input.value` inside the click handler. Type something first.
*Then log `typeof input.value`. **It's a string, always** — Section A of the last step exists
for this moment. Type `42` and confirm you get `"42"`, not `42`.*

### B3. Guard it
Click Add with the box empty, and with only spaces. Log what you get.
*Then add the guard you already wrote in B5: bail out early if the trimmed value is empty.
`if (...) return;` — a bare `return` with no value is fine in a handler; it just means "stop
here."*

### B4. Clear the input
After a successful add, empty the box.
*`input.value = ""`. Assignment again. Real apps do this so you can type the next item
immediately.*

### B5. Form submit — the one that trips everyone
Move your listener from the **button's** `click` to the **form's** `submit`:
```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  ...
});
```
*Two new things:*

- *The callback receives an **event object** — conventionally named `e`. It carries details
  about what happened.*
- *`e.preventDefault()` stops the browser's default behaviour. A form submit's default is
  **reload the page**, which wipes your `tasks` array. Comment out that line once and watch
  it happen — the page flashes and your list empties.*

*Why `submit` and not `click`: it fires for the button **and** for pressing Enter in the
input. One listener, both interactions. That's B6 done for free.*

### B6. Enter key
Confirm pressing Enter in the input adds a task.
*If B5 is right, this already works. If you're still on the button's `click`, it won't —
which is the argument for `submit`.*

---

# Section C — The render loop

This is the core of the whole step. Everything else is detail.

### C1. Bridge to the page
```js
function render() {
  document.querySelector("#app").innerHTML = renderPage(tasks);
}
```
*Call it once at the bottom of the file with a few hardcoded tasks and confirm your list
appears on the page.*

*This is the "one line" promised at the end of the last session: `console.log(renderPage(tasks))`
became `container.innerHTML = renderPage(tasks)`. Your engine didn't change at all.*

### C2. Close the loop
In the submit handler: add the task, then re-render.
```js
tasks = addTask(tasks, input.value);
render();
```
*Type, hit Add, watch it appear. That's an interactive app.*

### C3. The discipline
Two rules to follow from here on, deliberately:

1. **Nothing outside `render()` ever touches `innerHTML`.** No "just append this one `<li>`."
2. **Every handler does the same two steps:** change `tasks`, then call `render()`.

*It feels wasteful — you're rebuilding the whole list to add one item. Do it anyway. The
alternative (surgically patching the page) means keeping the DOM and your data in sync by
hand, and they drift apart within a day. "Change the data, redraw from the data" is what
React does too, just faster.*

### C4. Prove it
Add three tasks through the UI, then in the browser console type `tasks` and hit Enter.
*You'll see your real array. The page and the data are two views of the same thing — and the
data is the source of truth.*

---

# Section D — Per-item buttons (the hard part)

Your list renders, but you can't click individual tasks. This section is where the real DOM
gotcha lives.

### D1. See the problem first
Add a delete button to each task in `renderTasks`:
```js
`<li>${formatTask(task)} <button>delete</button></li>`
```
Then try to wire them up the obvious way:
```js
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => console.log("delete clicked"));
});
```
*Test it: click delete — works. Now **add a new task** (which re-renders), then click delete
on any item. Nothing happens.*

*Work out why before reading on. Hint: what does `innerHTML = ...` do to the elements that
were there before?*

<details>
<summary>The answer, once you've thought about it</summary>

Setting `innerHTML` **destroys every existing element** and builds new ones from your string.
Your listeners were attached to the old elements, which no longer exist. The new buttons look
identical and have nothing attached.

You could re-attach after every render. That's what most beginners do, and it's O(n)
listeners recreated constantly, plus one more thing to forget.
</details>

### D2. Put the id in the HTML
Change `renderTasks` so each delete button carries its task's id:
```html
<button data-id="3">delete</button>
```
*`data-*` attributes are custom data you can attach to any element. Read it back in JS with
`element.dataset.id`. This is how you get from "a button was clicked" to "which task is
that?"*

***Important:** `dataset.id` is a **string**, always — even though you wrote a number into it.
Section A of the last step, third appearance. Your `toggleTask` compares with `===`, so
`"3" === 3` is `false` and nothing will happen. Convert it.*

### D3. Event delegation
One listener, on the container, that never gets destroyed:
```js
document.querySelector("#app").addEventListener("click", (e) => {
  console.log(e.target);
});
```
*Click various things — a button, the text, the list item. `e.target` is the exact element you
clicked.*

*Why this works: clicks **bubble** up from the element you hit, through its parents, to the
document. So a listener on `#app` hears every click that happens inside it, including on
elements created after the listener was attached. `#app` itself is never replaced by
`render()` — only its contents are.*

### D4. Delete a task
In that one handler:
1. work out whether a delete button was clicked (`e.target` — check its tag, or a class you
   put on it)
2. get the id from `e.target.dataset.id` (convert it)
3. `tasks = removeTask(tasks, id)`
4. `render()`

*Step 1 matters: the handler fires for **every** click inside `#app`, including on plain text.
Guard clause at the top — if it wasn't a delete button, `return`.*

### D5. Toggle done
Add a second button per task (or make clicking the text toggle it), routed through the same
listener.
*Now you need to distinguish two kinds of click. Add a class — `class="delete-btn"` /
`class="toggle-btn"` — and branch on `e.target.classList.contains("delete-btn")`. One
listener, two behaviours.*

### D6. `closest()`
Put an icon or `<span>` inside your delete button, then click exactly on it.
*Your handler breaks — `e.target` is the span, not the button, so it has no `data-id`.*

*Fix: `e.target.closest(".delete-btn")` walks **up** from the clicked element looking for a
match, and returns `null` if there isn't one. That null doubles as your guard:*
```js
const btn = e.target.closest(".delete-btn");
if (!btn) return;
const id = Number(btn.dataset.id);
```
*This is the shape you'll write for the rest of your life. Learn it here.*

---

# Capstone — the working app

All of it together:

- [ ] Type a task, press Enter or click Add → it appears
- [ ] Blank/whitespace input does nothing
- [ ] The input clears after adding
- [ ] Clicking a task's delete button removes it
- [ ] Clicking toggle marks it done, and `[ ]` becomes `[x]`
- [ ] The summary line updates on every change
- [ ] The page never reloads
- [ ] Exactly **one** `addEventListener` for the whole list, on `#app`
- [ ] Nothing outside `render()` assigns to `innerHTML`

**Then a stretch, if you want it:** add a "clear completed" button, and style done tasks with
strikethrough. For the styling: give the `<li>` a class when done (`class="${task.done ?
'done' : ''}"`) and add `.done { text-decoration: line-through; }` to a `<style>` block in
your HTML. That's your first taste of driving CSS from data.

---

# Gotchas, collected

Read this when something doesn't work:

| symptom | cause |
|---|---|
| `Cannot read properties of null` | selector matched nothing — typo, or missing `#` |
| everything is `null` at startup | `<script>` runs before the HTML exists — you need `defer` |
| page reloads and the list empties | missing `e.preventDefault()` in a form submit |
| listeners stop working after re-render | attached to elements that `innerHTML` destroyed — use delegation |
| id comparison never matches | `dataset.id` is a string; `"3" === 3` is `false` |
| tags show as literal text | you used `textContent` where you meant `innerHTML` |
| clicking the icon inside a button fails | `e.target` is the icon — use `.closest()` |
| console.log shows nothing | you're looking at the terminal; it's in the browser now |

---

# What this unlocks

After this step you can build any UI that doesn't talk to a server. The list is always the
same shape: **state in a variable → render function → event handlers that change state and
re-render.**

The next thing is `fetch` and `async`/`await` — making it talk to a real backend, so your
tasks survive a refresh. That's where "full stack" actually begins.
