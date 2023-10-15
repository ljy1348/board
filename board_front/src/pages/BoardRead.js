import React, { useState,useEffect } from 'react'
import '../css/BoardRead.css'
import { useParams, useNavigate, renderMatches, useLocation } from 'react-router-dom'
import axios from 'axios';
import { Route, Routes  } from 'react-router-dom';
import Comment from './Comment';


function Board() {

  const initBoardList = {id:0,title:"",author:"", content:"", insertDate:"",vote:0, attachmentsData:"", isPinned:false, comment:[{commentAuthor:"",commentContent:""}], attachments:null};
  const initComment = {boardId:0,commentAuthor:"",commentContent:""};
  const navi = useNavigate();
  const [board, setBoard] = useState(initBoardList);
  const {id} = useParams();
  const [downURL, setDownURL] = useState("");
  const [comment, setComment] = useState(initComment);
  const [render, setRender] = useState(0);

  useEffect(()=>{
    axios.get("/board/read/"+id)
    .then(response => {
      setBoard(response.data);
      const byteCharacters = atob(board.attachments);
      const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      setDownURL(URL.createObjectURL(blob));
      setComment({...comment, boardId:id});
    })
    .catch(error =>{

      console.log();
    });
  },[])

  const onChangeComment = (e) => {setComment({...comment, commentContent:e.target.value});}

  const addComment = (e) => {
    axios.post("/board/comment/add", comment, {headers: { 'Authorization': localStorage.getItem('token') }})
    .then((response)=>{})
    .catch((error)=>{alert("로그인을 하셔야 합니다.")})
  }



  return (
    <div className='container'>
      <h1 className="display-1">게시판</h1>

      <table className="table">
  <thead>
    <tr>
      <th className=''>{board.title}</th>
      <td style={{width:'100px'}}>{ board.author == localStorage.getItem('name') &&
      <div><button>수정</button></div>
}</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th className='text-start' dangerouslySetInnerHTML={{__html: board.content}}></th>
    </tr>
    <tr>
      <th className='text-start'>첨부파일 : <a href={downURL} download={board.attachmentsData}>{board.attachmentsData}</a></th>
    </tr>
    <tr>

      <Comment id={id}></Comment>
    </tr>
    <tr>
      <td className='text-align'>
        <textarea style={{width:"80%"}} className='me-3' onChange={onChangeComment} value={comment.commentContent}></textarea>
        <button onClick={addComment}>등록</button>
        </td>
      </tr>
      <tr><td>
<button onClick={()=>{navi(-1)}}>돌아가기</button>
        </td></tr>
  </tbody>
</table>
  {/* <button onClick={write}>글쓰기</button> */}


    </div>
  )
}

export default Board