import React from 'react'
import '../App.css'
import { CipherIntro } from '../components/CipherIntro'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  let navigate = useNavigate();
  const goToAbout = () => {
    navigate('/about');
  }
  return (
    <div className="homepage">
      <div className="navbar">
        <div className="logo"><h1 className="title">Avalon Coin</h1></div>
        <div className="tabs">
          <div className="tab">Home</div>
          <div className="tab" onClick={goToAbout}>About</div>
        </div>
      </div>
      <div className="header">
        <p className="welcome">Hello ✋</p>
        <p className="welcome">You are Logged in Securely</p>
      </div>
      <CipherIntro />
    </div>
  )
}
