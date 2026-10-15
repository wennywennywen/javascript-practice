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