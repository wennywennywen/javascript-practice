//check the package.json while reading this 
// npm init -y : write -y meaning create the file and read nothing
// this -y become useful for later commands 
// for example npm test would read the  "scripts": {    "test": "echo \"Error: no test specified\" && exit 1"}
// the common ones are 
//npm init -y          once, at the start          → creates the file
//npm install X        whenever you need a library → records things you installed into this package file under the dependencies + downloads it
//npm install          when you clone a project    → downloads everything recorded
//npm run dev          every day                   → runs your saved command
//npm is two things:
//A huge public library of other people's code — millions of packages on a server.
//A command-line tool that downloads from it and runs your saved commands.

//after npm install dayjs 
//- **`package.json`** has a new `"dependencies"` section listing `dayjs`
//- **`package-lock.json`** appeared — the exact versions of everything, so the install is  reproducible on another machine
//- **`node_modules/`** appeared — the actual code, with lots of folder so no need to commit this to github

//N3 Import
import dayjs from "dayjs";
console.log(dayjs().format("YYYY-MM-DD"));

//N4 Scripts
//Add to `package.json`:

//```json
//"scripts": {
//  "start": "node index.js"
//}```
//Then `npm start`.
//npm start read scripts.start from package.json, ran node index.js, and node index.js then form the dayjs formatted today's date.
//so instead of node index.js in terminal can just write the npm start

//R1
//IMPORTANT! see the difference in format here 
// That's **JSX** — HTML written directly in JavaScript. Vite converts it before the browser sees it.
function renderPage(tasks) {
  return `<h2>...</h2><ul>...</ul>`;   // a string you had to insert yourself
}

function App() {
  return <h2>...</h2>;                  // markup React puts on the page for you
}

import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

//  useState(0)   // → [0, someFunction]
//                      ↑      ↑
//                 the value   how to change it
//so const mean call useState(0), take the first item out and call it count set that to 0, take the second and call it setCount.
//count — read it. What's the value right now? 
//setCount — change it. And changing it is what makes the page update.


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


//R2
function Greeting() {
  return <h2>Hello from my own component</h2>
}

export default Greeting

//then in another app calling Greeting you have to 
import Greetings from './Greetings'

return (
  <>
    <Greetings />
    <button>Count is </button>
  </>
)
//when there is another element like button you would need a div to wrap around both elements or just <> </>

//R3
//in HTML 
//<button class="del-btn">        ← your reading list
//<li class="task">               ← your tracker
//<label for="task-input">What's to read?</label>
//<input id="task-input">
//IMPORTANT!! label for and input id must always be the same!!

//but in JS class class — used for defining classes (class Dog { }) and for — used for loops (for (let i = 0; ...))

//so in JSX where it combine both HTML and JSK it gives different name like 
//- `className` instead of `class` (`class` is a reserved word in JS)
//- `htmlFor` instead of `for`
//- self closing tags like <br /> <img src="logo.png" alt="logo" /> <input id="ex-input" />
//- { } for JavaScript inside markup, where you'd have used `${ }`

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

    <form className = "example">
      <label htmlFor = "ex-input">Write an example</label>
      <input id="ex-input" />
    </form>

    </>
  )
}

export default App

//R4
function Greeting(name) {
  return <h2>Hello {name.name}</h2>
}

export default Greeting

//IMPORTANT!! notice the {name.name}!!
//then in the import part include this below 
import Greetings from './Greetings'

return(
    <Greetings name ="uyen"/>
)

//R5
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
//- `useState(0)` — "I need a piece of state, starting at 0"
//- `count` — the current value (your `tasks`)
//- `setCount` — how you change it (your `tasks = ...` **plus** the `render()`)

//R6
//IMPORTANT!! useState can be used multiple times!!
//NOTICE! the sandwiches method of button span button so concise!
function App() {
  const [count, setCount] = useState(0)

  const [sum, minusCount] = useState(5)

  return (
    <>
    <Greetings name ="uyen"/>
    <Greetings name ="uyen"/>
    <Greetings name ="uyen"/>
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

    <form className = "example" htmlFor = "ex-input">Write an example
      <input id="ex-input"></input>
    </form>
    <Counter />

    </>
  )
}

export default App

//R7
return (
    <ul>
    {books.map(book => <li key={book.id}>{book.text} is {String(book.done)}</li>)}
    </ul>
)

//IMPORTANT! this is how you render loop, only using map no more .join("")
//key={book.id} is very necessary!! and should be include in <li>
//React will always ignore boolean like true and false from book.done so you need {String(book.done)}
//remember to put the entire loop inside {}! treating it like {count}

//R8
//IMPORTANT!! the difference in DOM-style and React-style 
//For DOM-style, this part is in html
<input id="box">
<p id="out"></p>

//this part in js
const box = document.querySelector("#box")
const out = document.querySelector("#out")

console.log(box.value)

box.addEventListener("input", () => {
  out.textContent = box.value
})

//NOTICE! there is a box for input and out for output

//For React-style 
//All of this in jsx
const [text, setText] = useState("")

<input value={text} onChange={e => setText(e.target.value)} />
<p>{text}</p>

//so that 
//piece	        what it is
//<input ... />	 an HTML input. Self-closed — inputs have no children
//value={text}	 display whatever's in text. Braces = an expression, not literal text
//IMPORTANT!! NEW!! onChange={...} run this function whenever the user types
//e => ...	     an arrow function. e is the event object React hands you
//e.target	     the element the event happened on — this input
//.value	     the text in it right now
//setText(...)	 store that in state → redraw → value={text} shows it

//IMPORTANT!! imagine text is the input and setText is the function to produce the output
//setText(...) right now is only for showing the ... inside the text box thats it

//R8 

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
  //addBooks(books, text)    // → returns a new array: the old books plus one more
  //setBooks( ... )          // → stores that array, and redraws the page, anything with setX is like calling the render()

  const [text, setText] = useState("")
  //distinguish the Text as in the string of the input in the text box and Books as an array including all of the item from Text

  // --- counter practice (R5, R6) ---
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)
  const [sum, setSum] = useState(5)

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === "") return

    setBooks(addBooks(books, text))
    setText("")
    //setBooks(addBooks(books, text))   // add the new book to the list
    //setText("")                        // empty the input box
    //IMPORTANT!! write a separate function for both addBooks AND handling submit button
  }

  return (
    <>
      {/* ---------- READING LIST ---------- */}
      <h2>Reading list</h2>

      <form onSubmit={handleSubmit}>
//IMPORTANT!! onSubmit is always within the <form>
        <label htmlFor="book-input">What's to read?</label>
        <input
          id="book-input"
          value={text}
          onChange={e => setText(e.target.value)}
        />
//NOTICE! always keeping the input with onChange
//the setText(e.target.value) is to render that text is now the current value being typed in 
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
)}