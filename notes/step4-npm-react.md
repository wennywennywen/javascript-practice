# Step 4 — npm, then React

Two parts, very different sizes.

**Part 1 — npm.** Two days. Tooling, not concepts. You need it because React can't be used
without it.

**Part 2 — React.** Three weeks. The main event.

**Why React and not a server:** the companies you're aiming at lean JS/TS frontend. Depth on
the client side is worth more to you right now than a shallow pass at both halves. Node and
Express come later.

**The one sentence that makes React make sense:**

> You've spent two weeks writing `state changes → render() → page redraws` by hand. React does
> that automatically. That's it. That's the product.

Everything else is detail.

---

# PART 1 — npm (2 days)

**What it is:** a way to use code other people wrote, and a way to run commands without
remembering them.

You've written every line yourself so far. Nobody does that past a certain size.

---

### N1. Make a project

```bash
mkdir npm-practice
cd npm-practice
npm init -y
```

**What you'll see:** a new file, `package.json`.

Open it. It's a plain JSON file — the format from Step 3 Section A — describing your project:
its name, its version, its dependencies, its commands.

**This is the file that makes a folder "a project"** rather than a pile of files.

---

### N2. Install something and look at what happened

```bash
npm install dayjs
```

`dayjs` is a small date library. Now look around:

- **`package.json`** has a new `"dependencies"` section listing `dayjs`
- **`package-lock.json`** appeared — the exact versions of everything, so the install is
  reproducible on another machine
- **`node_modules/`** appeared — the actual code, and it's **huge**

**Count what arrived:** `ls node_modules | wc -l`. One small library, and often dozens of
folders — because your dependencies have dependencies.

**`node_modules` never goes in git.** It's enormous, it's machine-specific, and it's
regenerable: anyone with your `package.json` runs `npm install` and gets the same thing. Add it
to `.gitignore` — yours already has it.

**The split worth remembering:**
- `package.json` + `package-lock.json` → commit these
- `node_modules/` → never

---

### N3. Use it

```js
// index.js
import dayjs from "dayjs";
console.log(dayjs().format("YYYY-MM-DD"));
```

```bash
node index.js
```

**It'll fail** with something about modules. That's the exercise.

**The fix:** add `"type": "module"` to `package.json`.

**Why:** Node has two module systems. The old one (`require`) and the modern one (`import`),
which is what browsers use and what React uses. That line tells Node which you mean.

**And now you've met `import`** — the real answer to "how does one file use another," which you
asked back when `step2.js` couldn't see `renderPage`. No more shared global scope and
order-dependent script tags.

---

### N4. Scripts

Add to `package.json`:

```json
"scripts": {
  "start": "node index.js"
}
```

Then `npm start`.

**Why it matters:** real projects have commands nobody can remember —
`vite build --mode production --outDir dist`. Putting them in `scripts` means everyone on the
project runs `npm run build` instead.

**You'll see four names constantly:** `dev`, `build`, `test`, `start`.

---

### N5. Make a React project

```bash
npm create vite@latest my-first-react
```

Choose **React**, then **JavaScript** (not TypeScript — that's later).

```bash
cd my-first-react
npm install
npm run dev
```

**What you'll see:** a URL like `http://localhost:5173`. Open it. A spinning React logo.

**What Vite is:** the tool that turns modern code into something browsers can run, and reloads
the page the instant you save. Like Live Server, but it also handles JSX — which browsers don't
understand on their own.

**Explore before writing anything:**

- `src/App.jsx` — the component making what you see
- `src/main.jsx` — the three lines connecting React to `index.html`
- `index.html` — one nearly-empty `<div id="root">`

That `<div id="root">` should look familiar. It's your `<div id="app">`, and React fills it the
same way `render()` did.

**Change some text in `App.jsx` and save.** The page updates without a reload. That's the loop
you'll be living in.

---

# PART 2 — React (3 weeks)

## The mental model, before any syntax

Your app right now:

```js
tasks = addTask(tasks, text)    // change the data
render()                        // redraw, by hand
```

React:

```js
setTasks(addTask(tasks, text))  // change the data — the redraw happens for you
```

**That's the whole idea.** You describe what the page should look like *for a given state*, and
React re-runs that description whenever the state changes.

Your `renderPage(tasks)` was already a description — data in, markup out, no side effects. A
React component is the same function with better syntax.

**You are unusually well prepared for this.** Most people learn React without ever having
written the loop it replaces, so "it re-renders automatically" is magic. For you it's a
convenience you'd have written yourself.

---

## Week 1 — components, JSX, props, state

### R1. Read what's there

Open `src/App.jsx`:

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

**A component is a function that returns markup.** That's the entire definition.

Notice: no quotes, no backticks. That's **JSX** — HTML written directly in JavaScript. Vite
converts it before the browser sees it.

Compare to what you were writing:

```js
function renderPage(tasks) {
  return `<h2>...</h2><ul>...</ul>`;   // a string you had to insert yourself
}

function App() {
  return <h2>...</h2>;                  // markup React puts on the page for you
}
```

**Do this:** change the text, save, watch it update. Then break it on purpose — delete a
closing tag — and read the error. Vite's errors are good; get used to them early.

### R2. Your own component

Make `src/Greeting.jsx` that returns a heading, export it, import it into `App`, and use it as
`<Greeting />`.

**Three rules, and you'll break all of them once:**
- the function name must start with a **capital letter** — lowercase means an HTML tag
- it must `return` something
- one file, one component, exported

**Why components at all:** they're functions. `formatTask`, `renderTasks`, `renderPage` were
already three layers of one thing calling another. Components are that, with markup.

### R3. JSX vs HTML — the differences that will bite you

Write a component using all of these, then check the rendered output:

- `className` instead of `class` (`class` is a reserved word in JS)
- `htmlFor` instead of `for`
- every tag must close — `<br />`, `<img />`
- one top-level element per return — wrap siblings in `<>...</>`
- `{ }` for JavaScript inside markup, where you'd have used `${ }`

**That last one is the important one:**

```js
`<h2>${summary(tasks)}</h2>`     // your template literal
<h2>{summary(tasks)}</h2>        // JSX
```

Same idea — a hole with an expression in it. Different brackets.

### R4. Props

Make `Greeting` take a name and display it:

```jsx
<Greeting name="uyen" />
```

**Props are function arguments.** That's all. `<Greeting name="uyen" />` calls
`Greeting({ name: "uyen" })`.

You've done this: `formatTask(task)` took a task and returned markup for it. `<Task task={t} />`
is the same call with different punctuation.

**Do this:** pass a whole object as a prop, then render two fields from it. Then render three
`<Greeting />`s with different names.

**Rule to learn now:** props are **read-only**. A component never changes what it was given —
the same "never mutate the input" rule from Step 1.

### R5. State — `useState`

This is the one that replaces your `render()` calls.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**What each piece is:**
- `useState(0)` — "I need a piece of state, starting at 0"
- `count` — the current value (your `tasks`)
- `setCount` — how you change it (your `tasks = ...` **plus** the `render()`)

**The rule that trips everyone:** never assign to `count` directly. `count = 5` does nothing.
Only `setCount` tells React to redraw — exactly like changing `tasks` without calling
`render()` did nothing.

**Do this:** build a counter with + and −. Then add a Reset button. Then log inside the
component and watch how often it re-runs.

### R6. Two pieces of state

Add a second `useState` to the same component — a name in a text box alongside the counter.

**Point:** components can hold as many pieces of state as they need. Your app had `tasks`,
`loading`, and nearly `error` — three `useState` calls.

---

## Week 2 — lists, forms, effects

### R7. Rendering a list

```jsx
{items.map(item => <li key={item.id}>{item.text}</li>)}
```

**Exactly your `renderItems`** — `.map` over an array, one element each. Two differences:

- you return **JSX**, not a string
- no `.join("")` — React handles the joining
- each item needs a **`key`**

**About `key`:** React uses it to tell which item is which between renders, so it can update
one row instead of rebuilding the list. Use your `item.id`. Never use the array index — it
changes when you delete something, and React updates the wrong row.

**Do this:** render a hardcoded array of objects. Then delete the `key` and read the warning in
the console.

### R8. Forms — controlled inputs

```jsx
const [text, setText] = useState("");

<input value={text} onChange={e => setText(e.target.value)} />
```

**What this is:** the input's value comes *from state*, and every keystroke updates that state.
The state is the truth; the box just displays it.

Different from what you did — you read `input.value` when you needed it. Here you always know
what's typed, because it's in state.

**`e.target.value`** is the same `e.target` you used for delegation.

**Do this:** an input that shows what you've typed underneath, live. Then a form with
`onSubmit` and `e.preventDefault()` — identical to what you already wrote.

### R9. Lifting state up

Two components, one piece of state — a list in the parent, and a child that can delete from it.

**The rule:** state lives in the closest component that *both* halves need. The parent holds
the array and passes down both the data and a function to change it.

**Do this:** `<TaskList>` holds the array, renders `<TaskItem>` for each, and passes an
`onDelete` function down. The child calls it; the parent's state changes; both redraw.

**Why this is the hardest part of React:** deciding *where* state lives. Too low and two
components can't share it. Too high and everything re-renders. You'll get it wrong a few times
— everyone does.

### R10. `useEffect` and fetch

```jsx
useEffect(() => {
  // runs after render
}, []);
```

**What it's for:** things that aren't "describe the page" — fetching, timers, subscriptions.

**The `[]` at the end** means "run this once, when the component first appears." Leave it out
and it runs after *every* render — and if the effect sets state, that's an infinite loop. You
will do this once.

**Do this:** rebuild D1–D5 in React. Fetch the todos on mount, with three pieces of state:
`data`, `loading`, `error`. You already know the shape:

```
loading = true  →  fetch  →  ok? data : error  →  loading = false
```

Identical logic, no manual `render()` calls.

---

## Week 3 — the rebuild

### R11. The resolution tracker, in React

Same app. Same features. No `innerHTML`, no `querySelector`, no `addEventListener`, no
`render()`.

- [ ] add a resolution via a controlled input and a form
- [ ] toggle and delete per item
- [ ] summary line with correct singular/plural
- [ ] persists to `localStorage` (via `useEffect`)
- [ ] "Load examples" button fetching from the API
- [ ] loading and error states
- [ ] done items styled differently

**Your engine functions carry over untouched.** `addTask`, `removeTask`, `toggleTask`, `summary`
— they take data and return data, mention no browser, and mutate nothing. That's exactly what
React wants.

**That's the payoff for the three-layer split.** The view and wiring get replaced; the engine
doesn't move. Code written that way survives changing frameworks.

**What maps to what:**

| yours | React |
|---|---|
| `let tasks` | `useState` |
| `render()` | automatic |
| `renderPage(tasks)` | the component's `return` |
| `renderTasks` → `<li>` strings | `.map` → JSX |
| `addEventListener("click")` | `onClick={...}` |
| event delegation + `closest` | **gone** — each element gets its own handler |
| `data-id` + `Number()` | **gone** — pass the id in a closure |

Two whole categories of bug disappear, because the elements aren't destroyed and rebuilt.

---

## Then — Tailwind (Oct 15–21)

Styling without leaving your markup. `className="flex gap-4 p-2 rounded"` instead of a separate
CSS file. It'll feel wrong for two days and then obvious.

## Then — Node, Express, databases (Oct 22 onward)

The other half. Deferred on purpose.

---

# Gotchas you'll hit, in roughly this order

| symptom | cause |
|---|---|
| `Objects are not valid as a React child` | you rendered an object — pick a field off it |
| nothing updates when you click | assigned to the state variable instead of calling `setX` |
| "Each child should have a unique key" | missing `key` in a `.map` |
| infinite re-render loop | `useEffect` with no `[]`, setting state inside |
| `class` doesn't work | it's `className` |
| "Adjacent JSX elements must be wrapped" | two top-level elements — wrap in `<>...</>` |
| state looks stale right after `setX` | updates are batched; the new value appears next render |
| component renders twice in dev | React Strict Mode, on purpose. Not a bug |
| `Cannot read properties of undefined` in a component | data hasn't arrived yet — guard on `loading` first |
