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

### B3. Storing a whole list, not just one word

**Why this exercise exists:** B1 saved the word `"uyen"`. Your app doesn't have a word — it has
a list of objects. This shows you what goes wrong when you try, and what fixes it.

**Do this — part 1, watch it fail:**
```js
localStorage.setItem("items", [{ id: 1, text: "milk" }]);
console.log(localStorage.getItem("items"));
```

**What you'll see:** `[object Object]`. Your data is gone — no id, no text, nothing you can get
back.

**Why:** storage can only hold **text**. You handed it a list, so the browser converted it to
text the dumb way, and the dumb way throws everything away. Same thing you saw in A1.

**Do this — part 2, fix it:**

Two conversions, at two different moments:

- **going in** — wrap the list in `JSON.stringify(...)` before handing it to `setItem`
- **coming out** — wrap the `getItem(...)` in `JSON.parse(...)`

Store the parsed result in a variable and log `thatVariable[0].text`.

**What you'll see:** `milk`. If that prints, you got a real list back — not a string that looks
like one.

**Also check DevTools → Storage → Local Storage.** The saved value should read as
`[{"id":1,"text":"milk"}]` — readable text with your real data in it. That's how you know the
saving half worked, separately from the loading half.

---

### B4. What happens on someone's first visit

**Why this exercise exists:** the very first time anyone opens your app, nothing has ever been
saved. Your loading code has to survive that, or the app is broken for every new user —
including you, on a new browser.

**Do this:**
```js
console.log(localStorage.getItem("nothing-here"));
```

**What you'll see:** `null` — storage's way of saying "I've never heard of that name."

**Why it matters:** your app expects `tasks` to be an **array**. If loading hands back `null`
instead, the first `.filter` or `.map` crashes and nothing renders at all.

**The fix** is `??` from Step 1 — "use the thing on the right if the left is null or undefined."
You'll use it in B5.

**One thing that surprises people:** `JSON.parse(null)` doesn't throw an error. It quietly
returns `null`. So the problem passes straight through the parse and only blows up later,
somewhere that looks unrelated. Try it and see.

---

### B5. Make your tracker remember things

**Why this exercise exists:** this is the payoff. Right now every refresh wipes your
resolutions, because `let tasks = []` starts empty every single time. After this, they stay.

**The idea in plain English — two moments:**

```
WHEN THE PAGE LOADS
   storage  →  loadItems()  →  tasks  →  render()  →  on screen

WHEN ANYTHING CHANGES
   tasks changes  →  render()  →  on screen
                        └─────→  saveItems()  →  storage
```

`loadItems` is the way **in**. `saveItems` is the way **out**. That's all this is.

**Four edits to `app.js`:**

**1. Write `saveItems()`** — one line in the body, no parameters.

Its job: take `tasks`, turn it into text, file it under a name.
It needs nothing passed in — it reads `tasks` itself, and you type the name directly.

**2. Write `loadItems()`** — one line in the body, no parameters.

Its job: fetch the text filed under that same name, rebuild it into a list, and **return** it.
If nothing was ever saved, return `[]` instead of `null` — that's the `??` from B4.

It must say `return`, because whoever calls it needs the value back.

**3. Call `saveItems()` inside `render()`.**

Not in your handlers — *inside the render function itself*, right after the `innerHTML` line.

Why there: every one of your handlers already ends by calling `render()`. So one call inside
`render` covers adding, deleting and toggling at once. Put it in the handlers instead and
that's three places to write it, three places to forget it, and a fourth next time you add a
button.

**4. Change the top of the file** from `let tasks = []` to `let tasks = loadItems()`.

Instead of always starting empty, start with whatever was saved.

**Use the same name string in both functions.** `"items"` in one and `"tasks"` in the other
means they're writing to and reading from two different shelves, and nothing will ever load.
That's the most common mistake here and it's completely silent.

**Test it:** add three resolutions, tick one done, then refresh the page. Everything should
still be there, including which one was ticked.

---

### B6. Break it on purpose

**Why this exercise exists:** you now have code that depends on something outside your program.
You need to know how it fails before a user finds out for you.

**Try 1 — the empty case.** In the console:
```js
localStorage.clear()
```
Then refresh.

**What should happen:** the app loads, empty, no errors. If it crashes, your `?? []` is missing
or in the wrong place.

**Try 2 — the corrupted case.** DevTools → Storage → Local Storage → double-click your saved
value → replace it with `not json` → refresh.

**What will happen:** the app breaks completely, because `JSON.parse` throws on nonsense and an
uncaught error stops the whole script.

**That's the correct outcome for now** — don't fix it yet. Section C5 gives you `try/catch`,
which is the actual tool for this, and you'll come back and fix it there. For now just see it
happen, so you understand what "data from outside your program can be garbage" actually means.

---

### B7. Know when this is the wrong tool

**Why this exercise exists:** localStorage looks like it solved persistence. It solved a
narrow slice of it, and knowing the limits is the reason Section D exists.

**Try these and answer in comments:**

1. Open your tracker in a **different browser** — Safari if you were in Chrome. Is your list
   there?
2. If you opened it on your phone, would your list be there?
3. If you sent a friend the link, could they see your list?

**All three answers are no.** localStorage lives in **one browser, on one device**. It's not
an account, it's not a database, and nothing is shared.

For a personal tracker on your own laptop, that's genuinely fine. For anything with users,
logins, or more than one device, you need data stored somewhere central — on a server. That's
what Section D starts, and what Step 4 builds.

---

# Section C — Things that take time

**The problem this section solves:** every line you've written so far happened instantly. Ask
for a task, get a task. But asking another computer for data takes time — half a second, five
seconds, sometimes never. Your code has to cope with answers that arrive *later*.

**The picture to hold onto — ordering coffee:**

You order, you're given a receipt, and you **step aside**. You don't freeze at the counter
blocking the queue. Other people order. Then your name is called and you collect your drink.

JavaScript does the same thing. It starts something slow, steps aside, keeps running the rest
of your code, and comes back when the answer is ready.

Everything in this section is that one idea, in four different shapes.

---

### C1. Your code doesn't stand and wait

**Why this exercise exists:** to show you, once, that JavaScript does not pause for slow things.
Every confusing thing later in this section comes from this.

**Do this:**
```js
console.log("first");
setTimeout(() => console.log("second"), 1000);
console.log("third");
```

`setTimeout` means "run this bit later, after this many milliseconds." 1000 = 1 second.

**Predict the order, then run it.**

**What you'll see:** `first`, `third`, then a second later, `second`.

**Why:** `setTimeout` doesn't stop anything. It hands the job to the browser — "call me in a
second" — and your code carries straight on to the next line. That's stepping aside from the
counter.

**Now change `1000` to `0` and predict again.** The order is *identical*. Even at zero delay,
"later" still means "after the code I'm currently running has finished." Not sooner.

---

### C2. You can't read an answer that hasn't arrived

**Why this exercise exists:** this is the single most common mistake with slow code, and you
*will* make it with real data unless you make it here first, on purpose, where it's harmless.

**Do this:**
```js
let result;
setTimeout(() => { result = "done"; }, 100);
console.log(result);
```

**Predict, then run.**

**What you'll see:** `undefined`.

**Why:** the log runs immediately. The line that sets `result` runs a tenth of a second later.
You're reading the answer before it exists — checking the counter for your coffee two seconds
after ordering.

**The fix isn't to wait harder.** There's no line you can add that means "hang on a moment."
The fix is to move the code that *needs* the answer **inside** the thing that receives it:

```js
setTimeout(() => {
  result = "done";
  console.log(result);     // in here, it exists
}, 100);
```

Same idea as event handlers: code that depends on something arriving goes inside the thing that
catches it.

---

### C3. A promise is a receipt

**Why this exercise exists:** `fetch` doesn't hand you data. It hands you a promise, and if you
don't know what one is, its behaviour looks broken.

**Do this:**
```js
const p = new Promise((resolve) => {
  setTimeout(() => resolve("your coffee"), 500);
});

console.log(p);
p.then(value => console.log("got:", value));
console.log("after");
```

**Predict the order, and predict what the plain `console.log(p)` prints.**

**What you'll see:** something like `Promise {<pending>}`, then `after`, then half a second
later, `got: your coffee`.

**Why:** a promise is **a receipt for something that isn't ready yet**. Logging it straight
away shows you the receipt, not the drink — and it says *pending*, meaning "still being made."

It ends up in one of two states:
- **it worked** — the value is ready
- **it failed** — something went wrong instead

`.then(...)` is how you say: *"when it's ready, run this with it."* You're not waiting — you're
leaving instructions for when your name gets called.

`resolve("your coffee")` is the moment the drink is handed over.

---

### C4. `await` — "I'll wait here for this one"

**Why this exercise exists:** `.then` gets unreadable fast when one thing depends on another.
`await` does the same job but reads top-to-bottom like normal code. It's what you'll actually
write.

**Do this:**
```js
function later(value, ms) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function run() {
  console.log("start");
  const value = await later("your coffee", 500);
  console.log("got:", value);
}

run();
console.log("after run()");
```

**Predict the order.**

**What you'll see:** `start`, `after run()`, then `got: your coffee`.

**Why that middle line lands where it does:** `await` pauses **only the function it's sitting
in**. `run()` stops at that line and waits. The rest of your program carries on — which is why
`after run()` prints before the coffee arrives.

You stepped aside from the counter. Everyone else keeps ordering.

**Two rules, and the error messages will remind you of both:**
- `await` only works inside a function marked `async`
- an `async` function always hands back a promise, whatever you return from it

**The thing to appreciate:** `const value = await ...` reads exactly like ordinary code. That's
the whole point of `await` — it makes waiting look normal.

---

### C5. When it goes wrong

**Why this exercise exists:** anything involving another computer *will* fail sometimes — no
wifi, server down, wrong address. Right now a failure would kill your whole app, exactly like
the corrupted-storage case in B6. This is the tool that fixes both.

**Do this:**
```js
async function run() {
  try {
    const value = await Promise.reject(new Error("it broke"));
    console.log("you never see this");
  } catch (err) {
    console.log("caught:", err.message);
  } finally {
    console.log("this runs either way");
  }
}
run();
```

**What you'll see:** `caught: it broke`, then `this runs either way`. The line inside `try`
after the failure never runs.

**Why, in plain terms:**

- **`try`** — "attempt this; it might blow up"
- **`catch`** — "if it blew up, do this instead" (`err` holds what went wrong)
- **`finally`** — "do this whether it worked or not"

Without `try/catch`, a failure stops your entire script — every line after it never runs. With
it, you handle the problem and carry on.

`finally` is where you'd turn off a "Loading…" message, because it must disappear whether the
data arrived or the request failed.

**Then go back and fix B6.** Wrap the `JSON.parse` in `loadItems` with `try/catch`, so that
corrupted storage returns an empty list instead of killing your app. Test it the same way:
set the stored value to `not json` and reload. It should come up empty, not broken.

---

### C6. One at a time, or all at once

**Why this exercise exists:** when you fetch several things, the obvious way is often four
times slower than it needs to be. This is the most common speed mistake in real code.

**Do this — time both versions.** `console.time` / `console.timeEnd` measure how long something
took:

```js
// A — one after the other
console.time("A");
const a = await later("one", 1000);
const b = await later("two", 1000);
console.timeEnd("A");

// B — both at the same time
console.time("B");
const [c, d] = await Promise.all([later("one", 1000), later("two", 1000)]);
console.timeEnd("B");
```

**Predict both times, then run.**

**What you'll see:** A takes about 2 seconds. B takes about 1.

**Why:** in A, the second `await` doesn't even *start* until the first one has finished. You
ordered a coffee, waited, collected it, and only then ordered the tea.

In B, `Promise.all` starts both at once and waits for both to finish. You ordered both drinks
together. Total time is however long the slower one takes.

**When to use which:**
- **one at a time** — when the second thing genuinely needs the first one's answer
- **all at once** — when they don't depend on each other, which is most of the time

---

# Section D — Getting data from another computer

**What this section is:** so far your app only knows what you typed into it. `fetch` is how you
ask *another computer* for information — a weather service, a shop's product list, your own
server later on.

Everything in Section C was practice for this. `fetch` is slow (it goes over the internet), so
it hands you a receipt, and you use `await` to collect the answer.

**Two setup things:**

- **You need a real server running.** `fetch` refuses to work when you open a file directly
  (a `file://` address). Use Live Server, or `python3 -m http.server 8000`.
- **We'll borrow a free practice API:** `https://jsonplaceholder.typicode.com`. No signup, no
  password. It hands out fake to-do items for exactly this purpose.

---

### D1. Ask another computer for something

**Why this exercise exists:** to see the two-step shape of every fetch you'll ever write, and
why the second step catches everyone out.

**Do this:**
```js
async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  console.log(response);

  const data = await response.json();
  console.log(data);
}
getTodos();
```

**What you'll see:** two very different things.

**The first log is not your data.** It's a `Response` object — the envelope, not the letter. It
tells you whether the request succeeded, what status number came back, what type of content it
is. Expand it and look.

**The second log is your data** — an array of 5 objects, each with `id`, `title`, and
`completed`.

**Why two `await`s?** Because both steps take time:

1. `fetch(...)` — travel to the server and get a reply. Slow.
2. `response.json()` — read the body of that reply and turn the text into real objects. Also
   slow, because the body may still be arriving.

**Forgetting the second `await` is the most common beginner fetch bug.** You get a promise
instead of your data, and everything downstream looks broken for no obvious reason.

**One thing to notice about the data:** those objects have `title` and `completed`. Yours have
`text` and `done`. Same idea, different names. That matters in D6.

---

### D2. The older style, so you recognise it

**Why this exercise exists:** half the code you'll read online uses `.then()` instead of
`await`. You don't have to write it, but you have to be able to read it.

**Do this:** rewrite D1 without `async`/`await`, using `.then()` chains instead.

Each `.then(...)` means "when that's ready, do this next." The first one receives the response,
the second receives the data.

**What you'll see:** identical output. Same work, different spelling.

**Then go back to `await`.** It's what you'll write from here on — it reads top to bottom
instead of nesting sideways.

---

### D3. A 404 does not count as an error

**Why this exercise exists:** this catches out professionals, not just beginners. Your error
handling will look correct and quietly do nothing.

**Do this:**
```js
async function test() {
  const response = await fetch("https://jsonplaceholder.typicode.com/nope");
  console.log(response.ok, response.status);
}
test();
```

**Predict: does this crash?**

**It doesn't.** You'll see `false 404`.

**Why:** the request *worked perfectly*. You asked the server a question and it answered
clearly — the answer was just "I don't have that." From `fetch`'s point of view, a successful
conversation with a disappointing answer is still a success.

`fetch` only treats it as a failure when the conversation couldn't happen **at all** — no
internet, unreachable address, blocked by the browser.

**What this means for you:** `try/catch` alone will **not** catch a 404 or a 500. You have to
check yourself:

- **`response.ok`** — `true` for a good answer, `false` for 404, 500, and friends
- **`response.status`** — the actual number

If `ok` is false and you don't check, you sail on and try to read data that isn't there.

**Burn this in:** *"fetch doesn't throw on 404."* It's the most common fetch bug in real code.

---

### D4. A fetch function that handles failure properly

**Why this exercise exists:** D1 works only when everything goes right. Real networks don't.
This is the version you'd actually ship.

**Write `getTodos()` so it:**

1. fetches the URL
2. **checks `response.ok`** — if it's false, `throw` an error that includes the status number
3. otherwise returns the parsed array

**And wherever you call it**, wrap the call in `try/catch` so a failure prints a message
instead of killing everything.

**Why `throw` inside the function:** `getTodos`'s job is to return todos. If it can't, it
shouldn't return something misleading — it should say loudly that it failed, and let the caller
decide what to do about it. `throw` is how a function says "I can't do my job."

**Then break it on purpose.** Change the URL to something that doesn't exist and run it. You
should see your own error message, and the app should keep working.

**An error path you've never run is a guess, not a feature.**

---

### D5. Tell the user something is happening

**Why this exercise exists:** on your wifi a fetch takes half a second and feels instant. On a
phone on a train it takes eight seconds, and a blank screen looks broken.

**Do this:** show `"Loading…"` while the request is in flight, and replace it when the data
arrives.

**How it fits what you already have:** you don't touch the page directly. You add one more
piece of *state* next to `tasks`:

- a `let loading = true` variable
- `renderPage` checks it: if loading, return a "Loading…" message instead of the list
- set it to `false` when the fetch finishes — in the **`finally`** block, so it turns off
  whether the data arrived or the request failed
- call `render()` again afterwards

That's the same pattern as always: **change the state, then re-render.** Loading is just
another thing your state knows.

**To actually see it:** DevTools → Network tab → the throttling dropdown → **Slow 3G**. Reload.
Now you're seeing what a real user on a bad connection sees, and why this exercise exists.

---

### D6. Put real data into your own app

**Why this exercise exists:** to make the point that *other people's data doesn't get to
dictate how your app works*.

**Do this:** fetch 5 todos and display them using your **existing** `renderPage` — no changes
to it.

**The catch:** the API's objects look like this —

```js
{ id: 1, title: "buy milk", completed: false }
```

and your app expects this —

```js
{ id: 1, text: "buy milk", done: false }
```

Same information, different labels. So you need a **translation step**: `map` over what the
server sent and build objects in *your* shape, before any of it touches the rest of your app.

**Why this matters more than it looks:** if you let the API's names spread through your code,
then the day that API changes `title` to `name`, you're editing twenty places. With one
translation function at the edge, you edit one line and everything inside keeps working.

Keep the boundary thin: convert once, on the way in.

---

### D7. Sending data the other way

**Why this exercise exists:** so far you've only *read*. Sending is how a real app saves
anything — and it's what your own server will receive in Step 4.

**Do this:**
```js
const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "buy milk", completed: false }),
});
console.log(await response.json());
```

**What you'll see:** the object you sent, echoed back with an id. JSONPlaceholder pretends —
nothing is really saved — but the shape is exactly real.

**The three new pieces, in plain terms:**

- **`method: "POST"`** — "I'm sending you something," rather than the default `GET`, meaning
  "give me something."
- **`body`** — what you're sending. It has to be **text**, so `JSON.stringify` again. Section A
  is still earning its keep.
- **`headers`** — a note attached to the request saying what kind of thing the body is. Without
  it the server doesn't know it's receiving JSON and may ignore it.

**The symmetry worth noticing:** coming in, you `JSON.parse` what you receive. Going out, you
`JSON.stringify` what you send. Every boundary — storage, servers, files — works this way.

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
and tells the user what's happening. That's a complete client — the whole "JavaScript
fundamentals (DOM, fetch, async)" phase, done.

**Step 4 is npm, then React.** Backend comes later, deliberately: the target companies are
JS/TS-frontend-leaning, so depth on the client side comes first.

React will feel familiar fast. The render loop you built by hand —

```
state changes  →  render()  →  page redraws
```

— is exactly what React automates. You'll stop calling `render()` and it'll happen for you.
Building it manually first is why that will read as a convenience rather than magic.
