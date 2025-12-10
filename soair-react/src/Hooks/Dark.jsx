import React, { useState } from 'react'
import"../style/Dark.css"
const Dark = () => {
    const [Dark, setDark] = useState(false)
    
    const toggle = () =>{
        setDark(!Dark);
    }
return (
    <div className={Dark ?'dark' : 'white'}>
      <h1>hello world this is my website</h1>
      <p>look how the colors change</p>
      <button onClick={toggle}>Color</button>
    </div>
  )
}

export default Dark 
