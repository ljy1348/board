import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Homes() {
  
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const navigateToLogin = (event) => {
    navigate("/login");
  };

useEffect( ()=> {
  const currentTime = Date.now() / 1000;
  if (!(localStorage.getItem('exp') <= currentTime)) {
  const token = localStorage.getItem("token");
if (token != null) {
  setIsLogin(true);
}} else {
  localStorage.removeItem('token');
  localStorage.removeItem('exp');
  localStorage.removeItem('name');
}
}
,[])

const onClickEvent = (event) => {
  const type = event.target.getAttribute("data-type");
  switch (type) {
    case "logout" :
      localStorage.removeItem("token");
      localStorage.removeItem("exp");
      window.location.reload();
      break;
      default :
      navigate("/"+type);
      break;
  }
}

  return (
    <div>
        <button data-type="user" onClick={onClickEvent} className="m-3">
          회원 페이지
          </button>
          <button data-type="admin" onClick={onClickEvent} className="m-3">
            관리자 페이지
          </button>
          <button data-type="board" onClick={onClickEvent} className="m-3">
            게시판
          </button>
          <button data-type="user-info" onClick={onClickEvent} className="m-3">
            회원 정보
          </button>

      {!isLogin ?(
        <>

      <button data-type="register" onClick={onClickEvent} className="m-3">회원가입</button>

      <button data-type="login" onClick={navigateToLogin} className="m-3">로그인</button>
      </>)
      :<button data-type="logout" onClick={onClickEvent} className="m-3">로그아웃</button>
}
    </div>
  );
}

export default Homes;
