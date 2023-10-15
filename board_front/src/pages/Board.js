import React, { useState,useEffect,useLayoutEffect } from 'react'
import '../css/Board.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';



function Board() {

  const initBoardList = [{id:0,title:"",author:"", content:"", insertDate:"",vote:0, attachmentsData:"", isPinned:false, commentCount:0}]
  const navi = useNavigate();
  const [boardList, setBoardList] = useState(initBoardList);
  const [isDataLoaded, setDataLoaded] = useState(false);

  useEffect(()=>{
    axios.get("/board")
    .then(response => {
      setBoardList(response.data);
      setDataLoaded(true);
    })
    .catch(error =>{

      console.log();
    });
  },[])


  const write = ()=>{
    navi("/Board-up");
  }

  if (!isDataLoaded) {return null}


  else {
  return (
    <div className='container'>
      <h1 className="display-1">게시판</h1>

      <table className="table table-hover table-sm">
  <thead>
    <tr>
      <th scope="col" className='no'>No</th>
      <th scope="col" className='title'>제목</th>
      <th scope="col" className='author'>작성자</th>
      <th scope="col" className='vote'>추천</th>
      <th scope="col" className='date'>작성일</th>
    </tr>
  </thead>
  <tbody>
    {boardList.map((val,idx)=>{
      const date=new Date(val.insertDate);
      const formattedDate = `${date.getFullYear()-2000}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      return (
      <tr key={idx}>
      <th className='no'>{val.id}</th>
      <td className='title text-start'><Link to={"/board/" + val.id} className='titleLink '><span className='titleSpan'>{val.title}</span></Link> <span style={{color:"skyblue"}}>{val.commentCount}</span>
      {val.attachmentsData != '' && <img src='img/file.PNG'></img>}
      </td>
      <td className='author'>{val.author}</td>
      <td className='vote'>{val.vote}</td>
      <td className='date'>{formattedDate}</td>
    </tr>)
    })}
  </tbody>
</table>


<button onClick={write}>글쓰기</button>
    </div>
  )
}
}

export default Board