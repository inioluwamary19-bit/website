import React from 'react'
import { useState } from 'react'
const UseState = () => {
    const [count, setCount] = useState(0);

    const Increment = () => {
        setCount(count + 1);
    }
  return (
    <div>
      <p>count : {count}</p>
      <button onClick={Increment}>increase</button>
    </div>
  )
}

export default UseState
