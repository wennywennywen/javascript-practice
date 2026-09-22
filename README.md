# JavaScript Practice

Self-directed practice working through JavaScript from loops to React — fundamentals, the DOM,
async code, tooling. Every file here is exercise code: written, broken, and debugged by hand
rather than copied.

Worked through with an AI tutor giving hints rather than answers. The exercise sheets in
`notes/` came from that; the code and the comments are mine.

## Structure

```
01-fundamentals/     plain JavaScript, runs in Node
├── practice.js      loops, array methods, template literals
├── step1.js         type conversion, truthy/falsy, forEach, array update patterns
└── todo.js          a to-do engine with no UI — pure data in, data out

02-dom/              browser JavaScript
├── step2.js         selecting elements, events, rendering, event delegation
├── step2-1.js       the same app rebuilt from scratch, no notes, as a memory test
└── index.html       the page those run against

03-async/            data that outlives the page
└── step3.js         JSON, localStorage, promises, async/await, fetch

03-checkpoint/       everything above, one app, from empty files
├── index.html
├── app.js
└── style.css

04-npm-react/        tooling and the first framework
├── npm-practice/    package.json, installing packages, import/export, scripts
└── my-first-react/  a Vite + React project

notes/               the exercise sheets for each phase
```

## What each phase covered

**`practice.js`** — the accumulator pattern written by hand half a dozen times (box before the
loop, update inside, return after), then the same problems rewritten with `.map`, `.filter` and
`.find`. Then template literals, ternaries, and the `map + template + join` pattern that turns
an array of data into a block of HTML.

**`step1.js`** — the four things that break beginner code:
- type conversion (`"5" + 3` is `"53"`, and form inputs are always strings)
- truthy / falsy, `&&`, `||`, `??`, and the six falsy values
- `forEach` vs `map` — causing an effect vs producing a value
- updating arrays without mutating them (`[...tasks, newTask]`, `filter`, `map` + spread)

**`todo.js`** — all of the above assembled into a working to-do engine that runs in the
terminal. Add, remove, toggle, clear completed, and a render function producing HTML — with no
browser involved.

**`step2.js`** — the same engine connected to a real page: `querySelector`, `textContent` vs
`innerHTML`, form submission and `preventDefault`, the change-data-then-re-render loop, and
event delegation with `closest()` and `data-*` attributes.

**`step2-1.js`** — the whole thing rebuilt from an empty file, without looking at the previous
version. A test of what had actually stuck rather than what I could recognise. The structure
came back; the details (`data-id` vs `id`, catching the returned array) did not, which is what
made it worth doing.

**`step3.js`** — data that survives a refresh, and data that comes from somewhere else:
- `JSON.stringify` / `JSON.parse` — why everything crossing a boundary is text
- `localStorage`, and what happens on a first visit when nothing is saved
- `setTimeout`, promises, `async` / `await` — code that doesn't run top to bottom
- `try` / `catch` / `finally`
- `fetch` against a live API, and the fact that **a 404 doesn't throw** — you have to check
  `response.ok` yourself

**`03-checkpoint/`** — a reading list built from three empty files, with the previous projects
closed. Different domain on purpose, so it couldn't be typed from muscle memory. Everything
from the phases above in one app: the render loop, immutable updates, event delegation,
localStorage persistence, and a `fetch` with loading and error states.

The requirements and the self-tests are in `notes/checkpoint-test.md` — including the ones
worth running deliberately: corrupt the stored data, break the URL, turn the wifi off.

**`04-npm-react/`** — the tooling layer, and the start of React:
- `npm-practice/` — what `package.json` actually does, installing a package and watching it get
  recorded, `import`/`export` and the `"type": "module"` switch, npm scripts
- `my-first-react/` — a Vite + React project, scaffolded and stripped back

## Running it

```bash
node 01-fundamentals/step1.js
node 01-fundamentals/todo.js
node 04-npm-react/npm-practice/index.js
```

`02-dom/` and `03-checkpoint/` need a browser — open their `index.html`.

`03-async/step3.js` is split: the JSON and async sections run in Node, but `localStorage` only
exists in a browser, so those parts were run in the browser console instead. Same language,
different environment, different globals — which was its own lesson.

```bash
cd 04-npm-react/my-first-react
npm install
npm run dev
```

`node_modules` is not committed — `npm install` rebuilds it from `package.json`.

## What's next

React proper, then Tailwind, then Node and Express. Notes in
`notes/step4-npm-react.md`.

## Note on the comments

The files are heavily commented, often with things I got wrong and why. That's deliberate —
they're study notes as much as code.
