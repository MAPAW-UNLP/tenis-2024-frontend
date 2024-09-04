import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const LinkItem = ({to, setActive, name}) => {

  

  return (
    <li> <Link to={to} className='link' onClick={setActive} >{name}</Link> </li>
  )
}

export default LinkItem