import React, { useState,useEffect } from 'react'
// import '../css/BoardRead.css'
import { useParams, useNavigate, renderMatches, useLocation } from 'react-router-dom'
import axios from 'axios';
import { Route, Routes  } from 'react-router-dom';
// import Comment from './Comment';
import BoardComment from './BoardComment';


function BoardRead() {

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
      const byteCharacters = atob(response.data.attachments);
      const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      setDownURL(URL.createObjectURL(blob));
      setComment({...response.data, boardId:id});
    })
    .catch(error =>{

      console.log();
    });
  },[])

  // const onChangeComment = (e) => {setComment({...comment, commentContent:e.target.value});}

  // const addComment = (e) => {
  //   axios.post("/board/comment/add", comment, {headers: { 'Authorization': localStorage.getItem('token') }})
  //   .then((response)=>{})
  //   .catch((error)=>{alert("로그인을 하셔야 합니다.")})
  // }



  return (
    <div className='container'>
      <h1 className="display-1">게시판</h1>

      <table className="table">
  <thead>
    <tr>
      <td className='' >{board.title}</td>
      <td style={{width:'110px'}}><span>{ board.author == localStorage.getItem('name') &&
<><button className='btn btn-sm'>수정</button><button className='btn btn-sm'>삭제</button></>
}</span></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th className='text-start' dangerouslySetInnerHTML={{__html: board.content}} colSpan={2}></th>
    </tr>
    <tr>
      <th className='text-start' colSpan={2}>첨부파일 : <a href={downURL} download={board.attachmentsData}>{board.attachmentsData}</a></th>
    </tr>
    <tr>

      <BoardComment id={Number(id)}></BoardComment>
    </tr>
    <tr>
      <td className='text-align' colSpan={2}>
        {/* <textarea style={{width:"80%"}} className='me-3' onChange={onChangeComment} value={comment.commentContent}></textarea>
        <button onClick={addComment}>등록</button> */}
        </td>
      </tr>
      <tr><td colSpan={2}>
<button onClick={()=>{navi(-1)}}>돌아가기</button>
        </td></tr>
  </tbody>
</table>
  {/* <button onClick={write}>글쓰기</button> */}


    </div>
  )
}

export default BoardRead