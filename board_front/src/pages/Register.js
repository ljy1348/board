import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {

    let initReg = {
        username : "",
        password : ""
    }

    const [reg, setReg] = useState(initReg);
    const navigate = useNavigate();

    let inputChange = (event) => {
        setReg({...reg, [event.target.name]:event.target.value});
    }

    let buttonClick = (event) => {
      event.preventDefault();
        axios.put('/api/register', reg)
        .then(response => {
           navigate("/");
          })
          .catch(error => {
            console.log(error);
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
        <button type="submit" className="btn btn-primary" >가입</button>
        </form>
    </div>
  )
}

export default Register