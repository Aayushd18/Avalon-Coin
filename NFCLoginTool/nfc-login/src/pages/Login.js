import React, { useRef, useState } from "react"
import '../App.css';
import loginImg from '../login.png'
import { useNavigate } from 'react-router-dom'
import Modal from "react-modal";

export const Login = () => {
  const formRef = useRef();
  let navigate = useNavigate();

  Modal.setAppElement("#root");

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function loginUser(event) {
    event.preventDefault();
    const { value } = formRef.current.userinfo;
    console.log("handler 1", value);
    fetch(`http://localhost:3001/${value}`).then(res => res.json())
    .then(data => {
      if(data.code === true) {
        console.log(data)
        console.log('Success:', value);
        navigate('/home');
      }
    })
    
    formRef.current.reset();
  }

  function registerUser(event) {
    event.preventDefault();
    const { value } = formRef.current.userinfo;
    console.log("handler 2", value);
    fetch(`http://localhost:3001/register/${value}`).then(res => res.json())
    .then(data => {
      if(data.code === true) {
        console.log('Success:', value);
        toggleModal();
      }
    })
    formRef.current.reset();
  }


  return (
    <div className="lContainer">
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="modalTitle">Successfully Registered</div>
        <button className="login-form-button" onClick={toggleModal}>Close modal</button>
      </Modal>
      <h1 className="loginTitle" >Welcome To RFID Login System</h1>
      <div className="lItem">
      <div className="loginImage">
        <img src={loginImg} width="300" style={{position: 'relative'}} alt="login" />
      </div>
      <div className="loginForm">
        
        <form ref={formRef}>
          <div>
            <div className="inputlabel">User Id</div>
            <input className="inputfield" name="userinfo" type="text" placeholder="Enter User Id" autoComplete="off" />
          </div>
          <div className="checkboxContainer">
            <input className="checkbox" name="Checkbox" type="checkbox" />
            <label className="checkboxlabel">Remember me</label>
          </div>
          <div className="buttonContainer">
            <button name="login" className="login-form-button" type="submit" onClick={loginUser} >
              Login
            </button>
            <button name="register" className="login-form-button" type="submit" onClick={registerUser} >
              Register
            </button>
          </div>
        </form>
      </div>
      </div>
      <div className="footer">
        <p>Powered By Avalon Coin</p>
      </div>
    </div>
  )
}