import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Homes() {
  
  const [result, setResult] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem('token') == null) {
      return navigate("/login");
    }

    axios.get('/api/user/token', {headers: { 'Authorization': localStorage.getItem('token') },} )
        .then(response => {
            setResult("유저 권한을 확인했습니다.")

          })
          .catch(error => {
            setResult(error.message);
          });
  },[]);


  return (
    <div>
      {result}
    </div>
  );
}

export default Homes;
