import React, { useState, useEffect } from "react";
import { Link,useNavigate  } from 'react-router-dom';

function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navi = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('name');
    
    setIsLogin(false);

  };

//   const onClickTest = () =>{if (!isLogin)setIsLogin(true);
//                             else setIsLogin(false);}

    useEffect(()=>{
        const now:number = Date.now() / 1000;
        const exp = localStorage.getItem('exp');
        if (now > (exp as unknown as number) || localStorage.getItem('token')) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    },[])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            Board
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand" to={'/board'}>
                  게시판
                </Link>
              </li>
              <li className="nav-item"></li>
            </ul>
            {/* <button className="m-1" onClick={onClickTest}> 테스트 </button> */}
            {!isLogin && (
              <>
                <div>
                <Link to={'/regist'}>
                  <button
                    type="button"
                    className="btn btn-outline-primary m-1"
                  >
                    회원가입
                  </button>
                  </Link>
                </div>
                <div>
                <Link to={'/login'}>
                  <button
                    type="button"
                    className="btn btn-outline-primary m-1"
                  >
                    로그인
                  </button>
                  </Link>
                </div>
              </>
            )}
            {isLogin && (
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary m-1"
                  onClick={onClickLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
