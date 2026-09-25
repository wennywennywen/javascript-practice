import { useState } from 'react'
import Greetings from './Greetings'
import Counter from './Counter'
import './App.css'

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

      {/* ---------- PRACTICE: props (R4) ---------- */}
      <Greetings name="uyen" />
      <Greetings name="minh" />
      <Greetings name="lan" />

      {/* ---------- PRACTICE: live input (R8) ---------- */}
      <input value={text} onChange={e => setText(e.target.value)} />
      <p>{text}</p>

      {/* ---------- PRACTICE: one state, two buttons (R5) ---------- */}
      <button onClick={() => setCount(count - 1)}>−</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>

      {/* ---------- PRACTICE: a second, separate state (R6) ---------- */}
      <button onClick={() => setNumber(number - 2)}>−2</button>
      <span>{number}</span>
      <button onClick={() => setNumber(number + 2)}>+2</button>

      {/* ---------- PRACTICE: a third state, counting down ---------- */}
      <button onClick={() => setSum(sum - 1)}>Sum is {sum}</button>

      {/* ---------- PRACTICE: component in its own file ---------- */}
      <Counter />
    </>
  )
}

export default App
