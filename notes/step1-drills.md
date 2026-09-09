# Step 1 — The Four Gaps

Everything here is a prerequisite for the DOM. Nothing here is optional.

**Goal:** close type conversion, truthy/falsy, `forEach`, and array updates, then build a
working to-do *engine* with no browser involved. Next session that engine gets wired to a page,
and the wiring is about 10 lines.

## How to use this

1. Work in a **new file** — `step1.js`. Run with `node js/step1.js`.
2. **Predict before you run.** Write your guess in a comment, then run. The gap between
   your guess and reality is the whole lesson. Sections A and B are mostly prediction drills.
3. One `console.log` per exercise. Delete old ones as you go or the output becomes soup.
4. Post them to me in batches — I'll only tell you what's wrong, same as before.

## Your recurring bugs — reread before starting

1. The box appears on **both sides** of `=`. `total = total + x`, never `total = x`.
2. Never write to the input. Read from it, build the box, return the box.
3. After filtering, the original array must not appear again.
4. Name for what the value holds — plural for the array, singular in the callback.
5. `=` inside `if (…)` is always a bug. Default to `const`.
6. Your own functions are **called**, not reached into. `formatTask(task)`, not `task.formatTask`.

---

# Section A — Type conversion

**Why:** every value that comes out of a form input is a **string**, always. `"5"` not `5`.
Nearly every beginner form bug is this one fact.

### A1. Prediction drill

Write your guess as a comment next to each line, then run all of them.

```js
console.log("5" + 3);
console.log("5" - 3);
console.log("5" * "2");
console.log(5 + 3 + "1");
console.log("1" + 5 + 3);
console.log(Number("42"));
console.log(Number("42abc"));
console.log(Number(""));
console.log(parseInt("42abc"));
console.log(typeof "5", typeof 5);
```

Two rules explain every line: `+` means "join" if *either* side is a string, and everything
else (`-`, `*`, `/`) forces both sides to numbers. Find which lines each rule explains.

### A2. `addNums(a, b)`
`addNums("5", "3")` → `8` (not `"53"`).
*Convert before adding. `Number()` is the tool.*

### A3. `sumAll(values)`
`sumAll(["1", "2", "3"])` → `6`
*An array of strings, as if from three form inputs. `.map` to convert, then sum. Do the sum
however you like — loop or `.reduce`.*

### A4. `parsePrice(str)`
`parsePrice("$4.50")` → `4.5` (a number, not a string)
*Strip the `$` first — look up `.slice(1)` or `.replace("$", "")`. Confirm with
`typeof` that you got a number.*


### A6. `toFixed` gotcha
```js
const total = 4.5;
console.log(total.toFixed(2) + 1);
```
*Predict, then run. Why? What does `.toFixed()` actually return? Check with `typeof`.*

### A7. `formatTotal(items)`
Given `[{price: "4.50"}, {price: "2.00"}]` → `"Total: $6.50"`
*Strings in, formatted string out. Convert, sum, format. Combines A3, A6 and your template
literals.*

---

# Section B — Truthy, falsy, `&&`, `||`, `??`

**Why:** `document.querySelector(".missing")` returns `null`. Empty inputs are `""`. Guard
clauses built on these are the most common lines in DOM code.

### B1. Prediction drill

```js
if ("")        console.log("empty string is truthy");
if (0)         console.log("zero is truthy");
if ([])        console.log("empty array is truthy");
if ({})        console.log("empty object is truthy");
if ("0")       console.log("string zero is truthy");
if (null)      console.log("null is truthy");
if (undefined) console.log("undefined is truthy");
```

Predict which lines print. Two of them surprise almost everyone. Then memorise the falsy
list — there are exactly **six** values: `false`, `0`, `""`, `null`, `undefined`, `NaN`.
**Everything else is truthy**, including `[]` and `{}`.

### B2. Prediction drill — `&&` and `||`

```js
console.log(true && "yes");
console.log(false && "yes");
console.log("" || "default");
console.log("hello" || "default");
console.log(0 || "default");
console.log(0 ?? "default");
console.log(null ?? "default");
```

These don't return `true`/`false` — they return **one of the operands**. Work out the rule
from the output. Then explain the difference between the `0 ||` and `0 ??` lines in one
sentence; that difference is a real bug in real apps (think: a quantity of 0).

### B3. `displayName(user)`
```js
displayName({ nickname: "uy", name: "uyen" })  // → "uy"
displayName({ name: "uyen" })                  // → "uyen"
displayName({})                                // → "anonymous"
```
*One line, two `||`. This is the classic fallback chain.*

### B4. `isBlank(str)`
`isBlank("")` → `true`, `isBlank("   ")` → `true`, `isBlank("hi")` → `false`
*Look up `.trim()`. Then confirm `isBlank("0")` is `false` — `"0"` is a real string.*

### B5. `addTask(tasks, text)` — guard clause version
Returns the array unchanged if `text` is blank; otherwise returns it with the task added.
*The shape to learn:*
```js
if (/* bad input */) return tasks;   // bail out early
// ...normal path, un-indented
```
*Early returns keep the happy path flat. You'll write this at the top of every event handler.*

### B6. Safe access
```js
const user = { profile: { city: "hanoi" } };
const empty = {};

console.log(user.profile.city);
console.log(empty.profile.city);   // predict first
```
*The second one crashes. Fix it two ways: with `&&`, and with optional chaining `?.`
(look it up). Then explain why `empty.profile` gives `undefined` but `empty.profile.city`
throws — one is a missing key, the other is reaching into nothing.*

### B7. `summary(tasks)` revisited
Make your existing `summary` return `"no tasks yet"` for an empty array, instead of
`"0 of 0 tasks done"`. *Guard clause at the top.*

---

# Section C — `forEach`

**Why:** `map`/`filter` **produce** a new array. `forEach` **does** something and produces
nothing. Attaching click handlers to a list of buttons is `forEach`, not `map`.

### C1. Prediction drill
```js
const nums = [1, 2, 3];
const a = nums.map(n => n * 2);
const b = nums.forEach(n => n * 2);
console.log(a);
console.log(b);
```
*Predict both. `b` will look broken; it isn't. Explain why in one sentence.*

### C2. `logTasks(tasks)`
Prints each task on its own line using your `formatTask`. Returns nothing.
*`forEach` + an existing function. Note you are **printing**, not building a string —
that's the difference from `checklist`.*

### C3. `countDone(tasks)` with `forEach`
Returns the number of finished tasks — but using `forEach` and an external box, not `filter`.
*Box declared before, mutated inside the callback, returned after. Same accumulator
skeleton, callback instead of `for`. This proves `forEach` really is just a loop.*

### C4. When to use which — write the answers as comments
For each, name the right method and why:
1. Turn 10 tasks into 10 `<li>` strings
2. Print 10 tasks to the console
3. Get the tasks that aren't done
4. Get the first task containing "milk"
5. Attach a click handler to 10 buttons

*If you can answer these five without hesitating, you're ready for the DOM.*

---

# Section D — Array update patterns

**Why:** an app is "change the array, then re-render." You can currently read arrays but not
change them. This section is the actual blocker.

Data for this section — note the `id`:

```js
const tasks = [
  { id: 1, text: "buy milk", done: false },
  { id: 2, text: "study js", done: true  },
  { id: 3, text: "call mum", done: false },
];
```

**Why ids:** positions shift when you delete things, so index-based updates break the moment
the list changes. Real apps key on a stable id. Get used to it now.

### D1. `addTask(tasks, text)`
`addTask(tasks, "walk dog")` → a **new** 4-item array; original still has 3.
*Two ways — do both:*
- *`.push()` — mutates the original. Log the original after and confirm it changed.*
- *spread: `[...tasks, newTask]` — builds a new array, original untouched. Look up spread.*

*Then keep the spread version. Not mutating your data is a habit that will save you
constantly in React later.*

*The new task needs an `id`. Simplest honest approach: one more than the highest existing id.
Think about what that gives you for an empty array.*

### D2. `removeTask(tasks, id)`
`removeTask(tasks, 2)` → the two tasks with ids 1 and 3.
*This is `.filter` — "keep everything that isn't this one." One line. No loop, no `splice`.*

### D3. `toggleTask(tasks, id)`
`toggleTask(tasks, 1)` → same 3 tasks, but task 1 now has `done: true`.
*The hard one, and the most important. `.map` over all tasks:*
- *not the one you want → return it unchanged*
- *the one you want → return a **new object**, same fields, `done` flipped*

*Build the new object by hand first (`{ id: task.id, text: task.text, done: !task.done }`),
then learn the shorthand `{ ...task, done: !task.done }`. Do it the long way first so the
shorthand means something.*

*Check the original array afterwards — if `tasks[0].done` changed, you mutated instead of
copying.*

### D4. `editTask(tasks, id, newText)`
Same shape as D3, different field.
*If you find yourself copy-pasting D3, that's the right instinct — notice the duplication,
don't fix it yet.*

### D5. `clearCompleted(tasks)`
Returns only the unfinished ones. *One line, and you already wrote it once today.*

### D6. `toggleAll(tasks)`
Every task becomes done. Then: make it a real toggle — if all are already done, mark all
undone. *`.every()` is worth looking up here.*

### D7. Stretch — `moveUp(tasks, id)`
Moves a task one position earlier. Returns a new array; original untouched.
*Genuinely fiddly. Needs `.findIndex()`, and a decision about what happens at position 0.
Skip if tired — it's the least useful one here.*

---

# Capstone — the to-do engine

Put D1–D5 together with the render functions you already have, and drive it like an app.
No browser, no HTML file — just Node printing to the terminal.

```js
let tasks = [];

tasks = addTask(tasks, "buy milk");
tasks = addTask(tasks, "study js");
tasks = addTask(tasks, "call mum");
console.log(renderPage(tasks));
console.log(summary(tasks));

tasks = toggleTask(tasks, 2);
console.log(renderPage(tasks));
console.log(summary(tasks));

tasks = removeTask(tasks, 1);
console.log(renderPage(tasks));

tasks = clearCompleted(tasks);
console.log(renderPage(tasks));
```

Three things to notice when it works:

1. **`let tasks`, not `const`** — the variable is reassigned each time, because every function
   returns a *new* array rather than editing the old one. That's the whole pattern.
2. **Every line is `change the data` then `re-render`.** Nothing ever edits the output
   directly. Next session, `console.log(renderPage(tasks))` becomes
   `list.innerHTML = renderPage(tasks)` and it's a real app.
3. **You'd notice the repetition** of `tasks = …; render(…)` on every pair of lines. Hold that
   thought — collapsing it is exactly what a `render()` function and event handlers do next.

---

# Done when

- [ ] You can say what `"5" + 3` gives and why, without running it
- [ ] You can list the six falsy values from memory
- [ ] You can answer the five questions in C4 instantly
- [ ] `toggleTask` works **without** mutating the original array
- [ ] The capstone runs top to bottom and prints four different lists

Then: DOM. `querySelector`, `innerHTML`, `addEventListener` — and the engine above plugged
into a real page.
