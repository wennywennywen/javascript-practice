# Step 5 — Tailwind (Oct 15–21)

One week. Much smaller than React — no new mental model, just a different place to put the
same CSS you already know.

**If you don't know the CSS property, Tailwind won't help.** It's shorthand for CSS, not a
replacement for understanding it. `flex`, `padding`, `border-radius` still mean what they
meant in `main.css`.

---

## The one idea

You've written CSS two ways already:

```css
/* App.css */
.done { text-decoration: line-through; opacity: 0.5; }
```
```jsx
<li className="done">
```

Tailwind skips the middle step. Instead of naming a thing and describing it elsewhere, you
describe it where you use it:

```jsx
<li className="line-through opacity-50">
```

Each class does **one** thing. `p-4` is padding. `flex` is `display: flex`. `text-red-500` is
a colour. You compose them.

**What it buys you:**
- no inventing class names (`.card`, `.card-inner`, `.card-inner-active`…)
- no jumping between two files to change one thing
- deleting a component deletes its styles — no orphaned CSS nobody dares remove
- consistent spacing, because the numbers come from a scale rather than your mood

**What it costs:** your markup gets long and ugly. Everyone hates it for about two days.

---

# Setup

### T0. Install it

```bash
cd 04-npm-react/my-first-react
npm install tailwindcss @tailwindcss/vite
```

Then in `vite.config.js`, import the plugin and add `tailwindcss()` to the `plugins` array.

And replace everything in `src/index.css` with one line:

```css
@import "tailwindcss";
```

Restart the dev server — config changes need it.

**Install the VS Code extension** too: search `Tailwind CSS IntelliSense`. It autocompletes
class names and shows the real CSS on hover. Without it you'll be guessing constantly; with
it, hovering `p-4` tells you it's `padding: 1rem`. That hover is how you'll learn the scale.

### Done when
Add `className="text-3xl text-blue-500"` to your `<h2>` and it turns big and blue.

---

# Section A — the basics

### T1. Spacing and colour

**Why:** these four families are 80% of what you'll ever type.

**Do this** to your reading list heading and form:

| what | classes |
|---|---|
| padding | `p-4` all round, `px-4` sides, `py-2` top/bottom, `pt-4` top only |
| margin | `m-4`, `mx-auto`, `mt-8` — same pattern, `m` instead of `p` |
| text colour | `text-gray-700`, `text-blue-500`, `text-red-600` |
| background | `bg-white`, `bg-gray-100`, `bg-blue-500` |

**Hover each one in VS Code** and read the real CSS. That's the fastest way in.

### T2. The scale — why `p-4` and not `p-16px`

**Why this exercise exists:** the numbers look arbitrary until you see the system.

**Do this:** hover `p-1`, `p-2`, `p-4`, `p-8` and note the actual values.

You'll find `p-4` is `1rem` (16px) and the numbers are quarter-rem steps. So `p-2` is 8px,
`p-8` is 32px.

**Why it matters:** you can't type 13px. Everything snaps to a scale, so spacing across your
app is automatically consistent — the thing that makes amateur CSS look amateur.

**Colours work the same way:** `50` is nearly white, `500` is the middle, `950` is nearly
black. `text-gray-500` on `bg-gray-50` will always have sane contrast.

### T3. Typography

`text-sm` `text-base` `text-lg` `text-xl` `text-3xl` — sizes.
`font-bold` `font-medium` `font-normal` — weight.
`italic`, `underline`, `line-through` — you need that last one; it's your `.done` rule.

**Do this:** rewrite your `.done` CSS rule as Tailwind classes in `BookItem`, and delete the
rule from `App.css`. Two classes replace it.

---

# Section B — layout

This is the part worth real attention. Your reading list currently has buttons stacked
awkwardly — flex fixes it.

### T4. Flex

**Why:** "put these things in a row, with space between" is most of web layout.

```
flex              make this a row
items-center      line them up vertically in the middle
justify-between   push them apart, first left, last right
gap-2             space between children
flex-col          stack them vertically instead
```

**Do this:** put `flex items-center gap-2` on your `<li>` in `BookItem`. The checkbox, title
and buttons should line up neatly instead of running together.

Then `justify-between` and watch the buttons shove to the right edge.

**`gap` is the one to remember.** It spaces children without margins on each one — no more
"every item except the last needs a margin-right."

### T5. Width and centering

```
w-full        full width
max-w-md      but never wider than ~28rem
mx-auto       centre it horizontally
```

**Do this:** wrap your whole app in a `<div>` with `max-w-md mx-auto p-4`. Instantly looks
deliberate instead of stuck to the left edge.

That combination — `max-w-something mx-auto` — is how nearly every centred page column is
built.

### T6. Borders and rounding

```
border border-gray-300    a 1px grey border
rounded rounded-lg        corner radius
shadow shadow-md          drop shadow
```

**Do this:** make your input and buttons look like controls rather than browser defaults.
`border border-gray-300 rounded px-3 py-2` on the input is a reasonable starting point.

---

# Section C — the parts that make it worth it

### T7. States — hover, focus, disabled

**Why:** in plain CSS these need separate rules. In Tailwind they're a prefix.

```
hover:bg-blue-600      on hover
focus:outline-none     when focused
disabled:opacity-50    when disabled
```

**Do this:** give your Add button a hover colour and a `cursor-pointer`. Then
`disabled:opacity-50` plus `disabled={text.trim() === ""}` — the blank-input guard becomes
*visible* instead of silently doing nothing.

That last one is a real UX improvement, not just styling.

### T8. Responsive

**Why:** your reading list is unusable on a phone right now.

Prefixes, and they mean **"at this width and above"**:

```
text-sm md:text-base lg:text-lg
```

Small by default, bigger from medium screens up. **Mobile-first** — the unprefixed value is
the phone.

**Do this:** make your container `max-w-md` on mobile and `md:max-w-2xl` on larger screens.
Then drag your browser window narrow and watch it change.

**Test properly:** DevTools → the device-toolbar icon → pick iPhone. That's the view most of
your users would actually have.

### T9. Conditional classes — you already know this one

**Why this exercise exists:** it's the pattern you wrote yesterday, now doing more.

```jsx
<li className={props.book.done ? "line-through opacity-50" : ""}>
```

Identical shape to your `"done" : ""` ternary — just with the styles inline instead of a class
name pointing elsewhere.

**Do this:** make done books both struck through *and* a different colour, and unread ones
bold. One ternary, two outcomes.

**When the ternary gets ugly** (and it will), the fix is template literals:

```jsx
className={`flex items-center gap-2 p-2 ${book.done ? "opacity-50" : ""}`}
```

Base classes always, plus conditional ones. Your backticks and `${}` from Step 2, applied to
class names.

---

# Section D — when to stop

### T10. Long class lists — what to do about them

**Why:** by now some of your elements have ten classes and it looks awful. There's a right
answer and a wrong one.

**The wrong answer:** `@apply` to bundle them into a CSS class. It's available, and it
recreates the exact problem Tailwind exists to avoid — you're back to naming things and
jumping between files.

**The right answer: extract a component.** If three buttons share fifteen classes, that's not
a CSS problem, it's a missing `<Button>` component. You already know how to make one.

**Do this:** if any element in your app has more than ~8 classes repeated in two places, pull
it into a component.

---

# Capstone

Restyle the reading list properly. No `App.css` rules left except maybe a body background.

- [ ] centred column, sensible max width, padding
- [ ] the form and input look like real controls
- [ ] each `<li>` is a flex row, vertically aligned, with gaps
- [ ] buttons have hover states and `cursor-pointer`
- [ ] Add is visibly disabled when the input is empty
- [ ] done books are struck through and faded, via a ternary
- [ ] readable on a phone (DevTools device view)
- [ ] `index.css` is one `@import` line and nothing else

**Then screenshot it.** This is the first thing you've built that looks like a product rather
than an exercise, and it's going in the portfolio repo.

---

# Gotchas

| symptom | cause |
|---|---|
| no styles at all | Vite not restarted, or the plugin isn't in `vite.config.js` |
| one class does nothing | typo — Tailwind silently ignores unknown classes. Check IntelliSense |
| `text-md` doesn't work | it's `text-base`. There is no `md` |
| classes built by string concat don't work | Tailwind scans source as text — `text-${color}-500` can't be found. Write full names in a ternary |
| it looks fine on desktop, broken on mobile | you styled desktop-first. Unprefixed = mobile |
| the file is unreadable | that's the trade. Extract a component if it's repeated |

---

# What's next — Step 6: Node and Express (Oct 22)

The other half. Your own server answering your own `fetch`, your own database, and the data
finally surviving a different browser.

The four routes you'll build are `addBook`, `removeBook`, `toggleBook` and "give me the list"
— the same operations, moved across the network.
