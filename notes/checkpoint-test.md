# Checkpoint — Build It All Again

Before Step 4, one test. Not exercises — one app, from an empty folder, using only the things
you'll still be writing a year from now.

Nothing here is basics-for-the-sake-of-it. Every requirement below is a pattern you'll use in
every front end you ever build.

---

## The test

**A reading list.** Different nouns from the tracker on purpose — if it were the same words
you'd type it from muscle memory instead of thinking.

Three new files: `index.html`, `app.js`, `style.css`. **Don't open your old projects.**

### It must do

- [ ] Type an article title, press Enter or click Add → it appears in the list
- [ ] Blank or whitespace-only input does nothing, and the box clears after a successful add
- [ ] Each article has a **Read / Unread** toggle and a **Remove** button
- [ ] A line at the top: `"2 of 5 read"` — correct singular when there's one
- [ ] An empty list says something friendly, not `"0 of 0"`
- [ ] Everything survives a refresh
- [ ] A **"Load suggestions"** button fetches 5 posts from
      `https://jsonplaceholder.typicode.com/posts?_limit=5` and **adds** them to your list
- [ ] "Loading…" shows while that request is in flight
- [ ] If the request fails, the user sees a message — not just the console
- [ ] Read articles are visually different (strikethrough or faded) via a CSS class

### It must not

- [ ] Reload the page when you submit
- [ ] Break on a first-ever visit with empty storage
- [ ] Break if the stored value is corrupted — set it to `not json` in DevTools and reload
- [ ] Use more than **one** listener for all the per-article buttons
- [ ] Touch `innerHTML` anywhere except inside `render()`
- [ ] Mutate any array or object in place
- [ ] Lose articles you added when you click "Load suggestions"

### Prove it

Run through these deliberately when you think you're done:

1. Add three articles, refresh — still there
2. `localStorage.clear()`, refresh — loads empty, no errors
3. Set the stored value to `not json`, refresh — loads empty, no errors
4. Break the fetch URL on purpose — error message appears, app still works
5. DevTools → Network → Slow 3G, click Load — "Loading…" is visible
6. Turn wifi off, click Load — handled, not silent
7. Add an article, click Load — **your** article is still there afterwards
8. Delete the middle article — only that one goes

---

## What the sticking points mean

Honest diagnosis, not a scoring system. Wherever you stall, that's the thing to drill.

| where you get stuck | what it actually means |
|---|---|
| structuring the file | the three-layer split isn't automatic yet — that's the highest-value thing to fix |
| the render loop | re-read your own `render()`; this is the pattern everything else hangs on |
| `data-id` / `closest` | normal. Look it up, retype it, move on — everyone looks this up |
| `async` / `await` placement | write the wrapper function first, fill the middle after |
| the `?? []` on load | you've met it three times; make it a reflex |
| nothing renders | check the order: does anything run before the things it needs exist? |
| it "works" but nothing saves | is `saveItems()` inside `render()`, or in one handler you forgot? |

**Look things up freely.** MDN for method names is normal and permanent. Looking at *your own
previous app* is the thing to avoid — that's recognition, not recall.

**If you finish this without opening the old code, you can build front ends.** That's the real
checkpoint.

---

# What comes after

**Step 4 is npm, then React** — see `step4-npm-react.md`.

Not backend. That's deliberate: the target companies (LY Corp, Mercari, Rakuten, HENNGE) lean
JS/TS-frontend, so depth on the client side comes before servers. Node and Express are on the
roadmap for late October, after React and Tailwind.

**Why React lands well right now:** the loop you've been writing by hand for two weeks —

```
state changes  →  render()  →  page redraws
```

— is exactly what React does for you. You'll stop calling `render()` and it'll happen
automatically. Everyone who learns React first finds that mysterious; you'll find it obvious,
because you've already done the work it's replacing.

## Before starting

Two loose ends worth half an hour, low priority:

- `sumOdds` still sums the evens, and `findMax` breaks on all-negative arrays
- `repeatStr`, `joinWithDash`, and #9 (dedupe without `Set`) from the Step 1 drills

The checkpoint above matters more than either.
