import axios from 'axios';
import React, { useState } from 'react'

function Register() {

    let initReg = {
        username : "",
        password : ""
    }

    const [reg, setReg] = useState(initReg);

    let inputChange = (event) => {
        setReg({...reg, [event.target.name]:event.target.value});
    }

    let buttonClick = () => {
        axios.put('/api/registry')
        .then(response => {
            console.log("성공");
          })
          .catch(error => {
            console.log(error);
          });
        }

  return (
    <div className='container'>
        <form>
        <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">ID</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="아이디" onChange={inputChange} name='username' />
        </div>
        <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">PASSWORD</label>
        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="비밀번호" name='password'/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={buttonClick}>가입</button>
        </form>
    </div>
  )
}

export default Register