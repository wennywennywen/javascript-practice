# Step 4 notes — npm and React

Check the `package.json` while reading this.

## npm basics

`npm init -y` — the `-y` means create the file and read nothing.
This `-y` becomes useful for later commands.
For example `npm test` would read the `"scripts"` section:

```json
"scripts": { "test": "echo \"Error: no test specified\" && exit 1" }
```

The common ones are:

```
npm init -y          once, at the start          → creates the file
npm install X        whenever you need a library → records things you installed into this
                                                   package file under the dependencies
                                                   + downloads it
npm install          when you clone a project    → downloads everything recorded
npm run dev          every day                   → runs your saved command
```

**npm is two things:**
- A huge public library of other people's code — millions of packages on a server.
- A command-line tool that downloads from it and runs your saved commands.

**After `npm install dayjs`:**
- **`package.json`** has a new `"dependencies"` section listing `dayjs`
- **`package-lock.json`** appeared — the exact versions of everything, so the install is
  reproducible on another machine
- **`node_modules/`** appeared — the actual code, with lots of folders, so no need to commit
  this to github

---

## N3 — Import

```js
import dayjs from "dayjs";
console.log(dayjs().format("YYYY-MM-DD"));
```

## N4 — Scripts

Add to `package.json`:

```json
"scripts": {
  "start": "node index.js"
}
```

Then `npm start`.

`npm start` reads `scripts.start` from `package.json`, runs `node index.js`, and `index.js`
then prints the dayjs-formatted date.

So instead of `node index.js` in the terminal you can just write `npm start`.

---

## R1

**IMPORTANT!** See the difference in format here.

That's **JSX** — HTML written directly in JavaScript. Vite converts it before the browser
sees it.

```jsx
function renderPage(tasks) {
  return `<h2>...</h2><ul>...</ul>`;   // a string you had to insert yourself
}

function App() {
  return <h2>...</h2>;                  // markup React puts on the page for you
}
```

```jsx
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
```

```
useState(0)   // → [0, someFunction]
                    ↑      ↑
               the value   how to change it
```

So `const` means: call `useState(0)`, take the first item out and call it `count` (set to 0),
take the second and call it `setCount`.

- `count` — read it. What's the value right now?
- `setCount` — change it. And changing it is what makes the page update.

---

## R2

```jsx
function Greeting() {
  return <h2>Hello from my own component</h2>
}

export default Greeting
```

Then in another app calling `Greeting` you have to:

```jsx
import Greetings from './Greetings'

return (
  <>
    <Greetings />
    <button>Count is </button>
  </>
)
```

When there is another element like a button you would need a `div` to wrap around both
elements, or just `<> </>`.

---

## R3

**In HTML:**

```html
<button class="del-btn">        <!-- your reading list -->
<li class="task">               <!-- your tracker -->
<label for="task-input">What's to read?</label>
<input id="task-input">
```

**IMPORTANT!!** `label for` and `input id` must always be the same!

But in JS, `class` is used for defining classes (`class Dog { }`) and `for` is used for loops
(`for (let i = 0; ...)`).

So in JSX, where it combines both HTML and JS, it gives different names:

- `className` instead of `class` (`class` is a reserved word in JS)
- `htmlFor` instead of `for`
- self-closing tags like `<br />`, `<img src="logo.png" alt="logo" />`, `<input id="ex-input" />`
- `{ }` for JavaScript inside markup, where you'd have used `${ }`

```jsx
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Greetings />
    <button onClick={() => {
      setCount(count + 1)
      console.log("count is now", count)
    }}>
      Count is {count}
    </button>
    <h2>{count} forms </h2>

    <form className="example">
      <label htmlFor="ex-input">Write an example</label>
      <input id="ex-input" />
    </form>

    </>
  )
}

export default App
```

---

## R4

```jsx
function Greeting(name) {
  return <h2>Hello {name.name}</h2>
}

export default Greeting
```

**IMPORTANT!!** Notice the `{name.name}`!

Then in the import part include this below:

```jsx
import Greetings from './Greetings'

return(
    <Greetings name="uyen"/>
)
```

---

## R5

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

- `useState(0)` — "I need a piece of state, starting at 0"
- `count` — the current value (your `tasks`)
- `setCount` — how you change it (your `tasks = ...` **plus** the `render()`)

---

## R6

**IMPORTANT!!** `useState` can be used multiple times!

**NOTICE!** The sandwich method of button / span / button — so concise!

```jsx
function App() {
  const [count, setCount] = useState(0)

  const [sum, minusCount] = useState(5)

  return (
    <>
    <Greetings name="uyen"/>
    <Greetings name="uyen"/>
    <Greetings name="uyen"/>
    <button onClick={() => {
      setCount(count + 1)
      console.log("count is now", count)
    }}>
      Count is {count}
    </button>
    <button onClick={() => {
      minusCount(sum - 1)
      console.log("count is now", sum)
    }}>
      Count is {sum}
    </button>

    <button onClick={() => setCount(count + 1)}>+</button>
    <span>{count}</span>
    <button onClick={() => setCount(count - 1)}>−</button>

    <h2>{count} forms </h2>

    <form className="example" htmlFor="ex-input">Write an example
      <input id="ex-input"></input>
    </form>
    <Counter />

    </>
  )
}

export default App
```

---

## R7

```jsx
return (
    <ul>
    {books.map(book => <li key={book.id}>{book.text} is {String(book.done)}</li>)}
    </ul>
)
```

- **IMPORTANT!** This is how you render a loop — only using `map`, no more `.join("")`
- `key={book.id}` is very necessary! And should be included in the `<li>`
- React will always ignore booleans like `true` and `false` from `book.done`, so you need
  `{String(book.done)}`
- Remember to put the entire loop inside `{}`! Treating it like `{count}`

---

## R8

**IMPORTANT!!** The difference between DOM-style and React-style.

### DOM-style

This part is in HTML:

```html
<input id="box">
<p id="out"></p>
```

This part in JS:

```js
const box = document.querySelector("#box")
const out = document.querySelector("#out")

console.log(box.value)

box.addEventListener("input", () => {
  out.textContent = box.value
})
```

**NOTICE!** There is a `box` for input and `out` for output.

### React-style

All of this in JSX:

```jsx
const [text, setText] = useState("")

<input value={text} onChange={e => setText(e.target.value)} />
<p>{text}</p>
```

So that:

| piece | what it is |
|---|---|
| `<input ... />` | an HTML input. Self-closed — inputs have no children |
| `value={text}` | display whatever's in `text`. Braces = an expression, not literal text |
| `onChange={...}` | **IMPORTANT!! NEW!!** run this function whenever the user types |
| `e => ...` | an arrow function. `e` is the event object React hands you |
| `e.target` | the element the event happened on — this input |
| `.value` | the text in it right now |
| `setText(...)` | store that in state → redraw → `value={text}` shows it |

**IMPORTANT!!** Imagine `text` is the input and `setText` is the function to produce the
output.

`setText(...)` right now is only for showing the `...` inside the text box, that's it.

---

## R8 — the app so far

```jsx
// ============================================================
// HELPERS — data in, data out. No state, no JSX.
// Outside the component, so it isn't recreated on every render.
// ============================================================

function addBooks(books, title) {
  if (title.trim() === "") return books

  const ids = books.map(book => book.id)
  const newBook = { id: Math.max(0, ...ids) + 1, title: title.trim(), done: false }
  return [...books, newBook]
}

// ============================================================
// APP
// ============================================================

function App() {
  // --- the reading list ---
  const [books, setBooks] = useState([
    { id: 1, title: "Dune", done: false },
  ])

  const [text, setText] = useState("")

  // --- counter practice (R5, R6) ---
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)
  const [sum, setSum] = useState(5)

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === "") return

    setBooks(addBooks(books, text))
    setText("")
  }

  return (
    <>
      {/* ---------- READING LIST ---------- */}
      <h2>Reading list</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="book-input">What's to read?</label>
        <input
          id="book-input"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} is {String(book.done)}
          </li>
        ))}
      </ul>
    </>
  )
}
```

**Notes on the above:**

- `addBooks(books, text)` → returns a new array: the old books plus one more
- `setBooks( ... )` → stores that array, and redraws the page. Anything with `setX` is like
  calling `render()`
- Distinguish `text` (the string in the text box) from `books` (the array of every item
  added from `text`)
- `setBooks(addBooks(books, text))` — add the new book to the list
- `setText("")` — empty the input box
- **IMPORTANT!!** Write a separate function for both `addBooks` AND handling the submit button
- **IMPORTANT!!** `onSubmit` is always within the `<form>`
- **NOTICE!** Always keep the input with `onChange`
- `setText(e.target.value)` is to render that `text` is now the current value being typed in
