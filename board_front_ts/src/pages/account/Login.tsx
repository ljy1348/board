import React,{useState, useEffect} from "react";
import Account from '../../types/Account';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function Login() {
    const [login, setLogin] = useState<Account>({username:"",password:""});
    const navi = useNavigate();

    const onchangeInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [event.target.name]:event.target.value});
    }

    const onSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('/api/login', login)
        .then((response) => {
                const token = response.headers['authorization'];
                localStorage.setItem("token",token);
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const decod = JSON.parse(window.atob(base64));
                localStorage.setItem('exp',decod.exp);
                localStorage.setItem('name',decod.sub);
                window.location.replace("/");
            })
        .catch(error => {console.log(error)});
        
    }

    useEffect(()=>{
        const now:number = Date.now() / 1000;
        const exp = localStorage.getItem('exp');
        if (now > (exp as unknown as number) && localStorage.getItem('token') != null) {
            navi(-1);
        }
    },[])


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
      <button type="submit" className="btn btn-outline-primary m-1">로그인</button>
          </form>
    </div>
  );
}

export default Login;
