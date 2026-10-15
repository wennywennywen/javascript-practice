  function BookItem(props) {
    return (
        <li className={props.book.done ? "line-through opacity-50" : ""}>
          {props.book.done ? "[x]" : "[ ]"} {props.book.title}
          <button onClick={() => props.onDelete(props.book.id)}>Delete</button>
          <button onClick={() => props.onToggle(props.book.id)}>Toggle</button>
        </li>
  )}

  export default BookItem