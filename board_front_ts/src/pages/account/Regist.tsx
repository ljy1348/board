import React,{useState} from 'react';
import Account from '../../types/Account';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';

function Regist() {
    const [login, setLogin] = useState<Account>({username:"",password:""});
    const navi = useNavigate();

    const onchangeInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [event.target.name]:event.target.value});
    }

    const onSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('/api/register', login)
        .then(response => {navi(-1);})
        .catch(error => {console.log(error)});
    }

  return (
    <div className="container">
        <form onSubmit={onSubmitLogin}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          ID
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={login.username}
          onChange={onchangeInput}
          />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          비밀번호
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={login.password}
          onChange={onchangeInput}
          />
      </div>
      <button type="submit" className="btn btn-outline-primary m-1">회원가입</button>
          </form>
    </div>
  );
}

export default Regist