  function BookItem(props) {
    return (
        <li>
          {props.book.title} is {String(props.book.done)}
          <button onClick={() => props.onDelete(props.book.id)}>Delete</button>
        </li>
  )}

  export default BookItem