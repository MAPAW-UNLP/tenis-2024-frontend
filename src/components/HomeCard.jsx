import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
//styled components
import styled, {css} from 'styled-components'
import '../styles/homeCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableTennis } from '@fortawesome/free-solid-svg-icons'
const HomeCard = ({title, descr, Logo, color, link,nombreClase }) => {
const ImgCard = styled.div`
    height: 60%;
    background-color: ${color};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
`

const Card = styled.div`
    border: 5px solid #5D5D5D;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    background-color: #5D5D5D;
    text-align: center;
    height: 35vh;
    box-shadow: 0px 5px 20px #5D5D5D;
    transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    &:hover {
        border-radius:20px;
        cursor: pointer;
        border: 5px solid ${color};
        box-shadow: 0px 10px 30px ${color};
        height: 38vh;
  }`


  const navigate = useNavigate()
  const handleRedirect = ()=>{
    navigate(link)
  }
    return (
    <Card id='home_card' className={nombreClase} onClick={handleRedirect}>
        <ImgCard id='home_card_icon'>  <p id='logo-homecard'>{Logo}</p></ImgCard>
        <h2 style={{'color': color}}>{title}</h2>
        <h3>{descr}</h3>
    </Card>
  )
}

export default HomeCard