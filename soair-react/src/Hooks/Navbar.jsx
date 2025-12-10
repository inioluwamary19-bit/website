import React, { useState } from 'react'
import'../style/Navbar.css'
const Navbar = () => {
    const [isOpen , setIsOpen] = useState(false)
    
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
    <nav>
      <div className='logo'>MyWebsite</div>
      <button className='hamburger' onClick={toggle}>
        {isOpen? "close" : "open"}
      </button>
        <ul className={`menu ${isOpen ? 'open': ''}`}>
            <li><a href="/">home</a></li>
             <li><a href="/">about</a></li>
              <li><a href="/">services</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
