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


---

## R9 — state


```jsx
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} is {String(book.done)}
          </li>
        ))}
      </ul>

```
- IMPORTANT!! memorize that 
Component — a function that returns markup.
You have Review, Counter, Greetings.

Prop — something you pass into a component, written as an attribute.
You have <Greetings name="uyen" /> — name is a prop.
<BookItem book={book}/>  - book is a prop

State — a value the component remembers, via useState.
You have books and text.
const [text, setText] = useState("")
const [books, setBooks] = useState([])

so <BookItem book={book}/> mean takes one book as a prop and returns the <li>

In your file, App uses <Greetings /> and <Counter /> in its markup. So:


App                  ← parent
├── Greetings        ← child
├── Counter          ← child
└── BookItem         ← child (once you add it)
Parent = the component whose markup contains the other one.
Child = the one being placed inside.

props only flow downward, parent → child.

<Greetings name="uyen" />
//          └── App (parent) handing data to Greetings (child)
Greetings can't reach back up and change anything in App. It receives and displays.

So in R9:

App is the parent. It owns books and setBooks.
BookItem is the child. It gets one book and shows it.
When the child's Delete button is clicked, it can't remove anything — setBooks lives upstairs. 

- What is BookItem for?

App:  "make one of these for each book"   ← the .map
BookItem: "here's what one looks like"    ← the <li>
Same as formatTask — it formatted one task, and renderTasks called it per item.

- Click and Delete differences

onClick is real. It's a built-in React prop on DOM elements. React wires it to the browser's actual click event. The name is fixed — onClick, onChange, onSubmit. Misspell it and nothing happens.

onDelete is a name you invented. React has never heard of it. It's an ordinary prop, exactly like book:

in BookItem.jsx
<button onClick={() => props.onDelete(props.book.id)}>Delete</button>

in App.jsx
<BookItem book={book} onDelete={handleDelete} />
//        ^^^^ data    ^^^^^^^^ a function
That line says: "inside this child BookItem, props.onDelete means handleDelete."

So when the child BookItem writes: props.onDelete(3)
it's literally running: handleDelete(3)


---

## R10 — localStorage

The four pieces and what it does
- localStorage.setItem(key, text)	put text on the shelf under a label named as key
- localStorage.getItem(key)	read the text back (null if never saved)
- JSON.stringify(value)	array/object → text (stringify meaning turning it to text)
- JSON.parse(text)	text → array/object (parse meaning rebuilding it back to array/object)
Two belong to storage, two belong to JSON. Easy to mix up because they always appear together.

Your two functions

```js
function saveItems() {
  localStorage.setItem("items", JSON.stringify(tasks))
}

function loadItems() {
  return JSON.parse(localStorage.getItem("items")) ?? []
}
```

saveItems — read inside-out: stringify the array, then file it under "items".

loadItems — read inside-out: get the text, parse it back into an array. 

- In your program (a real array):

[ { id: 1, title: "Dune", done: false } ]

then JSON.stringify(...) turns it into:

'[{"id":1,"title":"Dune","done":false}]'

quotes around the whole thing — it's one string now
every key is quoted no spaces
you can't .map it. [0] gives you "[" — the first character
That's what goes on the shelf.

JSON.parse(...) turns it back:
[ { id: 1, title: "Dune", done: false } ]

- in R10 we will write like below 

```js 
const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("books")) ?? []
)

import { useState, useEffect } from 'react'
useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
}, [books])
```

- useEffect is the designated place for "and also do this, once the page is on screen." Saving to localStorage doesn't change what's on screen — it's a consequence that happens alongside. That's why it belongs in an effect rather than in the component body.
- The [] at the end of useEffect()
It controls how often:
useEffect(() => { ... }, [])          // after the FIRST render only
useEffect(() => { ... })              // after EVERY render
useEffect(() => { ... }, [books])     // after renders where `books` changed
- 
