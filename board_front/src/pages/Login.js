import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {

    let initReg = {
        username : "",
        password : ""
    }

    const [reg, setReg] = useState(initReg);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    let inputChange = (event) => {
        setReg({...reg, [event.target.name]:event.target.value});
    }

    let buttonClick = (event) => {
      console.log(reg);
      event.preventDefault();
        axios.post('/api/login', reg)
        .then(response => {
          const token = response.headers.get("Authorization");
    localStorage.setItem('token', token);
          
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decod = JSON.parse(window.atob(base64));
          localStorage.setItem('exp',decod.exp);
            navigate("/");
            window.location.reload()
          })
          .catch(error => {
            console.log(error);
            setErrorMessage(error.response.data);
          });
        }

  return (
    <div className='container'>
        <form onSubmit={buttonClick}>
        <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">ID</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="아이디" onChange={inputChange} name='username' />
        </div>
        <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">PASSWORD</label>
        <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="비밀번호" onChange={inputChange} name='password'/>
        </div>
        <button type="submit" className="btn btn-primary" >로그인</button>
        </form>
        <div className='mt-4 text-danger' >
          {errorMessage}
        </div>
    </div>
  )
}

export default Register