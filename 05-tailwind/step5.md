# Step 5 notes — Tailwind 

## T1 - T3

Tailwind is about writing css directly into jsx in the brackets under the ClassName = ""

```jsx
<li className={props.book.done ? "line-through opacity-50" : ""}>
```

line-through opacity-50 is added in the condition to format everything!

some typical ones are 
| what | classes |
|---|---|
| padding | `p-4` all round, `px-4` sides, `py-2` top/bottom, `pt-4` top only |
| margin | `m-4`, `mx-auto`, `mt-8` — same pattern, `m` instead of `p` |
| text colour | `text-gray-700`, `text-blue-500`, `text-red-600` |
| background | `bg-white`, `bg-gray-100`, `bg-blue-500` |


## T4
Same thing applied for adding flex to put these things in a row, with space between

```
flex              make this a row
items-center      line them up vertically in the middle
justify-between   push them apart, first left, last right
gap-2             space between children
flex-col          stack them vertically instead
```

IMPORTANT!!!! this is how you add flex alongside with a ternary condition thing! using {`flex ${ternary condition}`}

**`gap` is the one to remember.** It spaces children without margins on each one 

```js
<li className={`flex items-center gap-2 ${props.book.done ? "line-through opacity-50" : ""}`}>
```

## T5

with `max-w-md mx-auto p-4`. Instantly looks deliberate instead of stuck to the left edge. Add this into div for the whole app 
IMPORTANT!! To do that add it in the <> right after return() in function App!!!

```js
<div className='max-w-md mx-auto p-4'>


