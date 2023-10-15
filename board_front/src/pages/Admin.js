import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Homes() {
  
  const initUserList = [{
    username : "",
    authority : ""
  }]
  // 권한인증 결과 제출 (디버깅용)
  const [result, setResult] = useState(false);
  // 서버에서 받아온 유저 목록
  const [userList, setUserList] = useState(initUserList);
  // 페이지 갱신을 위한 변수
  const [change, setChange] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 페이지 접속 인증
  useEffect(()=>{
    const startTime = performance.now();
    const currentTime = Date.now() / 1000;
    if (localStorage.getItem('exp') <= currentTime) localStorage.removeItem('token');
    if (localStorage.getItem('token') == null) {
      return navigate("/login");
    }
    axios.get('/api/admin/token', {headers: { 'Authorization': localStorage.getItem('token') },} )
        .then(response => {
            setUserList(response.data);
            setResult(true);
          })
          .catch(error => {
            if (error.code == "ERR_BAD_REQUEST") setError("권한이 없습니다.");
            else setError("404 NotFound");
          })
          const lastTime = performance.now();
          console.log(lastTime-startTime);
  },[change]);

  // 변경버튼을 눌렀을때 현재 선택된 값을 해당 아이디에 적용
  const onSubmitEvent = (e) => {
    e.preventDefault();
// 정보 전달용 객체
  const updatedUser = {username : e.target.username.value , authority:e.target.select.value};
    // 액시오스 통신
    axios.post('/api/admin/change', updatedUser, {headers: { 'Authorization': localStorage.getItem('token') },})
    .then(response => {
      // 페이지 자동갱신을 위한 변수
      let i = change+1;
      setChange(i);
    }).catch(error => {
      console.log(error);
    })
  }

  if (!result){return <div>{error}</div>};
  return (
    <div className="container">
      {/* {result}  디버깅용 */}
      {/* 테이블 시작 */}
      <table className="table">
  <thead>
    {/* 테이블 머릿말 */}
    <tr>
      <th scope="col">#</th>
      <th scope="col">ID</th>
      <th scope="col">권한</th>
      <th scope="col">변경</th>
    </tr>
  </thead>
    {/* 테이블 본문 시작 */}
  <tbody>
    {userList.map((val,idx) => {
      return (
          <tr key={idx}>
            <th>{idx+1}</th>
            <th>
          {val.username}
            </th>
            <th>
          {val.authority}
            </th>
            <th>
              {/* 정보 전달용 폼 */}
              <form onSubmit={onSubmitEvent}>
                <input type="hidden" value={val.username} name="username"></input>
          <select name="select">
            <option value='USER'>일반 회원</option>
            <option value='ADMIN'>관리자</option>
          </select>
          <button type="submit" className="ms-3 btn-primary">변경</button>
              </form>
            </th>
    </tr>
      )
    }) }
  </tbody>
</table>

    </div>
  );
}

export default Homes;
