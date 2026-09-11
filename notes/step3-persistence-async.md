# Step 3 — Data That Outlives the Page

Your app works, and everything in it dies on refresh. This step fixes that twice over: first
with the browser's own storage, then by talking to a real server.

**This is where "full stack" starts.** Everything so far has been one browser tab talking to
itself. From here your code talks to something outside itself — which means waiting, failing,
and handling both.

## How to use this

Same as always. Predict, run, post in batches, hints not answers.

**Where to work:**
- Sections A–B go straight into your **resolution tracker**. Real payoff — it stops losing data.
- Sections C–D in a new `03-async/` folder in `javascript-practice`.

---

# Section A — JSON

**Why:** storage and servers both speak text, not JavaScript. JSON is the translation layer,
and it's the same in both directions.

### A1. Objects are not text
```js
const item = { id: 1, text: "milk", done: false };
console.log(String(item));
console.log(JSON.stringify(item));
```
*Predict both. You've met the first one before — it's what produced `[object Object]` back in
Step 2. The second is what you actually want.*

### A2. Round trip
```js
const items = [{ id: 1, text: "milk", done: false }];
const text = JSON.stringify(items);
const back = JSON.parse(text);

console.log(typeof text, typeof back);
console.log(back[0].text);
console.log(text === JSON.stringify(back));
```
*`stringify` object → string. `parse` string → object. Confirm you get a real array back that
you can index and `.map` over.*

### A3. What survives the trip
```js
const weird = {
  num: 1,
  str: "hi",
  bool: true,
  arr: [1, 2],
  nested: { a: 1 },
  fn: () => "hello",
  undef: undefined,
  date: new Date(),
};
console.log(JSON.parse(JSON.stringify(weird)));
```
*Predict which keys survive. Three of them don't come back the way you put them in.*

*JSON has no concept of functions, `undefined`, or dates — it's text, and only understands
strings, numbers, booleans, null, arrays and objects. Your tasks are all of those, so you're
fine. Worth knowing before you try to store something cleverer.*

### A4. Broken input
```js
console.log(JSON.parse("not json"));
```
*It throws. Read the error. Anything reading JSON from outside your program — storage, a
server, a file — can receive garbage, which is why `try/catch` shows up in C5.*

### A5. Pretty-printing
```js
console.log(JSON.stringify(items, null, 2));
```
*Third argument is indentation. Useless to the computer, invaluable when you're staring at
a response trying to work out its shape.*

---

# Section B — localStorage

**Why:** the smallest possible persistence. No server, no accounts, five lines.

### B1. Set and get
```js
localStorage.setItem("name", "uyen");
console.log(localStorage.getItem("name"));
```
*Run it, then **refresh the page** and run only the `getItem` line. Still there.*

*Then open DevTools → Application (Chrome) or Storage (Safari) → Local Storage. You can see
and edit everything your page has stored. That panel is also how you clear it while testing.*

### B2. It only stores strings
```js
localStorage.setItem("count", 5);
const n = localStorage.getItem("count");
console.log(n, typeof n);
console.log(n + 1);
```
*Predict all three. Fourth appearance of this theme: `input.value`, `dataset.id`, `toFixed`,
and now storage. **Anything crossing a boundary comes back as text.***

### B3. Storing an array
```js
localStorage.setItem("items", [{ id: 1, text: "milk" }]);
console.log(localStorage.getItem("items"));
```
*Predict, then run. You get `[object Object]` — the A1 problem. Fix it with `stringify` going
in and `parse` coming out.*

### B4. The missing key
```js
console.log(localStorage.getItem("nothing-here"));
```
*Returns `null` — one of your six falsy values. So a first-time visitor's load path has to
cope with `null`, not an array. `??` is built for exactly this.*

### B5. Save and load in the tracker

Two small functions in your resolution tracker:

- **`saveItems()`** — stringify `items` and put it in localStorage under one key
- **`loadItems()`** — read that key, parse it, and return the array. If the key is missing,
  return an empty array rather than `null`.

Then wire them:

- call `saveItems()` **inside `render()`** — every render follows a data change, so one call
  covers add, delete and toggle. That's the C3 discipline paying off.
- initialise `items` from `loadItems()` at the top of the file, instead of `[]`.

**Test:** add three items, tick one, refresh. Everything should still be there.

### B6. Edge cases to try deliberately
1. Clear localStorage in DevTools, reload — does the app start cleanly or crash?
2. Edit the stored value to `not json` in DevTools, reload — what happens?

*The second one breaks your app, and correctly so for now. C5 gives you the tool to handle it.*

### B7. Know the limits

Answer these in comments — you'll need to know when localStorage is the wrong choice:

1. Open the page in a different browser. Is your data there?
2. Would it be there on your phone?
3. Could a friend see your list?

*localStorage is **one browser on one device**. That's fine for a personal tracker, useless
for anything shared. The answer to all three is the whole reason servers exist — which is
Section D.*

---

# Section C — Async

**Why:** talking to a server takes time. Everything you've written so far ran instantly, top to
bottom. That stops being true now.

### C1. Code that doesn't wait
```js
console.log("first");
setTimeout(() => console.log("second"), 1000);
console.log("third");
```
*Predict the order. Then change `1000` to `0` and predict again — the answer doesn't change,
and that surprises everyone.*

*`setTimeout` hands your callback to the browser and **returns immediately**. The rest of your
code runs; the callback fires later. "Later" never means "before the current code finishes,"
even at 0ms.*

### C2. The classic wrong answer
```js
let result;
setTimeout(() => { result = "done"; }, 100);
console.log(result);
```
*Predict. This is *the* async mistake, and you'll make it with `fetch` if you don't meet it
here: you can't read a value that hasn't arrived yet. The fix isn't to wait harder — it's to
put the code that needs the value **inside** the thing that receives it.*

### C3. Promises
```js
const p = new Promise((resolve) => {
  setTimeout(() => resolve("the value"), 500);
});

console.log(p);
p.then(value => console.log("got:", value));
console.log("after");
```
*Predict the order and what the bare `console.log(p)` prints.*

*A promise is **an object representing a value that isn't here yet**. It's in one of three
states — pending, fulfilled, rejected. `.then` says "when it arrives, run this."*

### C4. async / await
```js
function later(value, ms) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function run() {
  console.log("start");
  const value = await later("the value", 500);
  console.log("got:", value);
}

run();
console.log("after run()");
```
*Predict the order. `await` pauses **the function it's in** until the promise settles — it does
not pause the rest of your program, which is why `"after run()"` lands where it does.*

*Two rules: `await` only works inside a function marked `async`, and an `async` function always
returns a promise, whatever you put in the `return`.*

### C5. When it fails
```js
async function run() {
  try {
    const value = await Promise.reject(new Error("it broke"));
    console.log("never reached");
  } catch (err) {
    console.log("caught:", err.message);
  } finally {
    console.log("always runs");
  }
}
run();
```
*`try/catch` is how `async/await` handles failure. Anything that throws inside `try` jumps to
`catch` with the error object. `finally` runs either way — where you'd turn off a loading
spinner.*

*Then go back to **B6 case 2** and wrap your `JSON.parse` in try/catch so corrupted storage
returns an empty array instead of killing the app.*

### C6. Sequential vs parallel
```js
// A
const a = await later("one", 1000);
const b = await later("two", 1000);

// B
const [c, d] = await Promise.all([later("one", 1000), later("two", 1000)]);
```
*Time both with `console.time("label")` / `console.timeEnd("label")`. Predict first.*

*Version A takes 2 seconds, B takes 1. `await` on its own line means "stop until this is done"
— fine when the second call needs the first one's result, wasteful when it doesn't. This is
the single most common performance mistake in real code.*

---

# Section D — fetch

**Why:** this is the actual skill. Everything in C exists to make this make sense.

**You need a real server.** `fetch` doesn't work from `file://` — use Live Server, or
`python3 -m http.server 8000`.

We'll use `https://jsonplaceholder.typicode.com` — a free fake API, no key, no signup.

### D1. Your first request
```js
async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  console.log(response);
  const data = await response.json();
  console.log(data);
}
getTodos();
```
*Look at the two logs. The first is a **Response** object — status, headers, metadata. Not
your data.*

*The second `await` is the part everyone forgets: `.json()` is **also** async, because the
body may still be arriving. Two awaits, always.*

*Then look at the shape of `data` — an array of objects with `id`, `title`, `completed`.
Almost your items, with different field names.*

### D2. `.then` vs `await`
Rewrite D1 using `.then()` chains instead of `await`.
*You'll meet both in every tutorial and codebase you read. Write it once so the shape is
familiar, then go back to `await` — it's what you'll use.*

### D3. The 404 that isn't an error
```js
const response = await fetch("https://jsonplaceholder.typicode.com/nope");
console.log(response.ok, response.status);
```
*Predict whether this throws.*

***It doesn't.*** *A 404 is a successful HTTP conversation — the server answered, the answer was
"no". `fetch` only rejects when the request couldn't happen at all (no network, bad URL, CORS).*

*So `try/catch` alone will not catch a 404. You must check `response.ok` yourself and throw if
it's false. This is the single most common `fetch` bug in the wild.*

### D4. A proper fetch function
Write `getTodos()` that:
1. fetches the URL
2. throws if `!response.ok`, with the status in the message
3. returns the parsed array
4. is called inside `try/catch` by whoever uses it

*Test the error path by breaking the URL on purpose. An error path you haven't run is a
guess.*

### D5. Loading state
Render `"Loading…"` before the fetch and replace it when data arrives.
*Your `render()` already redraws from data — so add a `let loading = true` alongside `items`,
have `renderPage` check it, and flip it in `finally`.*

*Half a second feels instant to you on wifi. Throttle it: DevTools → Network → "Slow 3G", then
reload. That's what a real user on a train sees, and it's why loading states exist.*

### D6. Into your render pipeline
Fetch the todos and display them with your **existing** `renderPage`.

*Their fields are `title` and `completed`; yours are `text` and `done`. So you need a
translation step — `map` each API object into your shape before it touches your app.*

*That step is worth understanding: you never let a server's data shape dictate your app's
internals. You have one small function at the boundary that converts, and everything inside
stays consistent.*

### D7. Sending data
```js
await fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "buy milk", completed: false }),
});
```
*Log the response. JSONPlaceholder fakes it — nothing is really saved — but the shape is real.*

*Three things to notice: the second argument is an options object, the body must be
**stringified** (Section A again), and the `Content-Type` header is how the server knows what
it's receiving.*

---

# Capstone

Your resolution tracker, with:

- [ ] items persisted to localStorage, surviving refresh
- [ ] corrupted storage handled gracefully instead of crashing
- [ ] a "load examples" button that fetches 5 todos from the API and adds them
- [ ] a loading message while it fetches
- [ ] an error message on failure — test it by breaking the URL
- [ ] no crash and no console errors on a fresh, empty first visit

---

# Gotchas

| symptom | cause |
|---|---|
| `[object Object]` in storage | forgot `JSON.stringify` |
| `n + 1` gives `"51"` | storage returns strings |
| crash on a fresh visit | `getItem` returned `null`, code expected an array |
| `data` is a Response object | missing the second `await` on `.json()` |
| 404 not caught by try/catch | `fetch` doesn't reject on HTTP errors — check `response.ok` |
| `await is only valid in async functions` | the enclosing function isn't marked `async` |
| value is `undefined` right after an async call | reading before it arrived — C2 |
| fetch fails on `file://` | needs a real server |
| "blocked by CORS policy" | the server hasn't allowed your origin; not fixable from the client |

---

# What this unlocks

After this you can build a front end that loads real data, survives refreshes, handles failure,
and tells the user what's happening. That's a complete client.

**Step 4 is the other half:** Node and Express — writing the server your `fetch` talks to,
storing data in a database, and having your own API instead of borrowing someone else's.
