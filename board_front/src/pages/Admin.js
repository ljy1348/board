import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Homes() {
  
  const initUserList = [{
    username : "",
    authority : ""
  }]
  
  const [result, setResult] = useState("");
  const [userList, setUserList] = useState(initUserList);
  const [change, setChange] = useState(0);

  const navigate = useNavigate();

  useEffect(()=>{
    const startTime = performance.now();
    const currentTime = Date.now() / 1000;
    console.log(currentTime);
    if (localStorage.getItem('exp') <= currentTime) localStorage.removeItem('token');
    if (localStorage.getItem('token') == null) {
      return navigate("/login");
    }
    console.log("디버깅용");
    axios.get('/api/admin/token', {headers: { 'Authorization': localStorage.getItem('token') },} )
        .then(response => {
            setResult("관리자 권한을 확인했습니다.")
            setUserList(response.data);
          })
          .catch(error => {
            if (error.message === "Request failed with status code 403") {
              return setResult("권한이 없습니다.");
            }
            setResult(error.message);
          })
          const lastTime = performance.now();
          console.log(lastTime-startTime);
  },[change]);

  const onSubmitEvent = (e) => {
    e.preventDefault();

  const updatedUser = {username : e.target.username.value , authority:e.target.select.value};
    
    axios.post('/api/admin/change', updatedUser, {headers: { 'Authorization': localStorage.getItem('token') },})
    .then(response => {
      let i = change+1;
      setChange(i);
    }).catch(error => {
      console.log(error);
    })
  }


  return (
    <div className="container">
      {result}
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">ID</th>
      <th scope="col">권한</th>
      <th scope="col">변경</th>
    </tr>
  </thead>
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
