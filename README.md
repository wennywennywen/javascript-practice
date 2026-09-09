# JavaScript Practice

Self-directed practice working through JavaScript fundamentals and the DOM, from loops to a
working interactive app. Every file here is exercise code — written, broken, and debugged by
hand rather than copied.

Worked through with an AI tutor giving hints rather than answers; the exercise sheets in
`notes/` came from that, and the code and comments are mine.

## Structure

```
01-fundamentals/     plain JavaScript, runs in Node
├── practice.js      loops, array methods, template literals
├── step1.js         type conversion, truthy/falsy, forEach, array update patterns
└── todo.js          a to-do engine with no UI — pure data in, data out

02-dom/              browser JavaScript
└── step2.js         selecting elements, events, rendering, event delegation

notes/               the exercise sheets
```

## What each phase covered

**`practice.js`** — the accumulator pattern written by hand half a dozen times (box before the
loop, update inside, return after), then the same problems rewritten with `.map`, `.filter` and
`.find`. Then template literals, ternaries, and the `map + template + join` pattern that turns
an array of data into a block of HTML.

**`step1.js`** — the four things that break beginner code:
- type conversion (`"5" + 3` is `"53"`, and form inputs are always strings)
- truthy / falsy, `&&`, `||`, `??` and the six falsy values
- `forEach` vs `map` — causing an effect vs producing a value
- updating arrays without mutating them (`[...tasks, newTask]`, `filter`, `map` + spread)

**`todo.js`** — all of the above assembled into a working to-do engine that runs in the
terminal. Add, remove, toggle, clear completed, and a render function producing HTML — with
no browser involved.

**`step2.js`** — the same engine connected to a real page: `querySelector`, `textContent` vs
`innerHTML`, form submission and `preventDefault`, the change-data-then-re-render loop, and
event delegation with `closest()` and `data-*` attributes.

The finished version of that app lives in a separate repo.

## Running it

```bash
node 01-fundamentals/step1.js
node 01-fundamentals/todo.js
```

`02-dom/step2.js` needs an HTML page to run against — it's kept here as a record of the
exercises, with the notes explaining each step.

## Note on the comments

The files are heavily commented, often with things I got wrong and why. That's deliberate —
they're study notes as much as code.
