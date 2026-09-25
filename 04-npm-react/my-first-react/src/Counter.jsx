import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(5);
  return <button onClick={() => setCount(count - 1)}>{count}</button>;
}

export default Counter