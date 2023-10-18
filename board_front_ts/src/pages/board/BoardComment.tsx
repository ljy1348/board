// import React from 'react'

// function BoardComment({id}:{id:number}) {
//   return (
//     <td colSpan={2}>{id}</td>
//   )
// }

// export default BoardComment

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/table/BoardComment.css";

function Comment({ id }:{id:number}) {
  const initReCommnet = { boardId:0, commentContent: "", isReComment:0, parentCommentId:0 };

  const initComment = [{ commentId: 0, commentAuthor: "", commentContent: "", isReComment:0, parentCommentId:0 }];
  const [comment, setComment] = useState(initComment);
  const [username, setUsername] = useState("");
  const [commentIdx, setCommentIdx] = useState(-1);
  const [commentEdit, setCommentEdit] = useState({
    commentContent: "",
    commentId: 0,
  });
  const [addComment, setAddComment] = useState({boardId:id,commentContent:""})
  const [reder, setRender] = useState(0);
  const [reCommentIdx, setReCommentIdx] = useState(-1);
  const [reComment, setRecomment] = useState(initReCommnet);

  // 댓글 목록 불러오기 및 댓글과 토큰 아이디 일치하면 수정/삭제 버튼 표시하기
  useEffect(() => {
    axios
      .get("/board/comment/" + id)
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (localStorage.getItem("token") !== null) {
      const jwtToken = localStorage.getItem("token");
      const base64EncodedPayload = jwtToken?.split(".")[1];
      if (base64EncodedPayload){
        const payload = atob(base64EncodedPayload);
        const payloadObj = JSON.parse(payload);
        setUsername(payloadObj.sub);
      }
    }
  }, [reder]);

  // 댓글 수정 눌렸을 때 댓글 수정창 뜨게 하기
  const onClickEdit = (e:any) => {
    setCommentIdx(e.target.value);
    setCommentEdit({
      commentId: comment[e.target.value].commentId,
      commentContent: comment[e.target.value].commentContent,
    });
  };

  // 댓글 삭제
  const onClickDelete = (e:any) => {
    axios.delete("/board/user/comment/delete/"+e.target.value, {headers: { 'Authorization': localStorage.getItem('token') },})
    .then(response => {setRender(reder+1)})
    .catch(error =>{});
};

// 댓글 수정창 바인딩 함수
  const onChangeComment = (e:any) => {
    setCommentEdit({ ...commentEdit, commentContent: e.target.value });
  };

  // 댓글 수정 완료
  const onClickSave = () => {
    axios.put("/board/user/comment/edit", commentEdit, {headers: { 'Authorization': localStorage.getItem('token') }})
    .then(response=>{setRender(reder+1); setCommentIdx(-1);})
    .catch(error=>{console.log(error)});
  };

  // 대댓글 작성 화면 호출
  const onClickComment = (commentId:number, parentCommentId:number) =>{
    setReCommentIdx(commentId);
    setRecomment({...reComment, boardId:id,parentCommentId:parentCommentId, isReComment:1})
    setRender(reder+1);
  };

  // 대댓글 바인딩 함수
  const onChangeReComment= (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecomment({...reComment, commentContent:e.target.value});
  }

  // 대댓글 서브밋 함수
  const onSubmitReComment = () => {
    axios.post("/board/user/comment/add", reComment, {headers: { 'Authorization': localStorage.getItem('token') }})
    .then(response=>{setRender(reder+1); setReCommentIdx(-1); setRecomment(initReCommnet)})
    .catch(error=>{console.log(error)});
  }

  // 댓글 등록창 바인딩 함수
  const onChangeAddComment = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
    setAddComment({...addComment, commentContent:e.target.value});
  };

  // 댓글 등록 서브밋
  const onSubmitAddComment = () =>{
    axios.post("/board/user/comment/add", addComment, {headers: { 'Authorization': localStorage.getItem('token') }})
    .then(response=>{setRender(reder+1); setAddComment({...addComment, commentContent:""})})
    .catch(error=>{console.log(error)});
  };

  return (
    <>
    <tr>
    <th className="text-start" colSpan={2}>
      {comment.map((val, idx) => {
        return (
          <table
            key={val.commentId}
            style={{
              tableLayout: "fixed",
              width: "100%",
              borderBottom: "1px solid #000",
            }}
          >
            <tbody>
              <tr>
              {val.isReComment > 0 && <td style={{width:"20px"}}>┖</td>}
                <td style={{ width: "100px", wordWrap: "break-word" }}>
                  {/* {val.isReComment > 0 && <>┖</>} */}
                  {val.commentAuthor}
                </td>
                {commentIdx != idx ? (
                  <>
                    <td style={{ width: "80%" }}>
                      <div
                      onClick={()=>onClickComment(val.commentId, val.parentCommentId)}
                        style={{
                          width: "100%",
                          maxWidth: "80%",
                          wordWrap: "break-word",
                        }}
                      >
                        : <span>{val.commentContent}</span>
                      </div>
                    </td>
                    <td style={{ width: "100px" }}>
                      {username === val.commentAuthor && (
                        <>
                          <button value={idx} onClick={onClickEdit}>
                            수정
                          </button>
                          <button value={val.commentId} onClick={onClickDelete}>
                            삭제
                          </button>
                        </>
                      )}
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <textarea
                        style={{ width: "100%" }}
                        value={commentEdit.commentContent}
                        onChange={onChangeComment}
                      ></textarea>
                    </td>
                    <td style={{ width: "100px" }}>
                      <button onClick={onClickSave}>완료</button>
                    </td>
                  </>
                )}
              </tr>
              {reCommentIdx === val.commentId&&<tr><td colSpan={5} className='text-align'><textarea className="me-3" 
              onChange={onChangeReComment} value={reComment.commentContent}>
                </textarea><button onClick={onSubmitReComment}>등록</button></td></tr>}
            </tbody>
          </table>
        );
      })}
    </th>
    </tr>
        <tr>
        <td className='text-align' colSpan={2}>
          <textarea className='me-3' onChange={onChangeAddComment} value={addComment.commentContent}></textarea>
          <button type="submit" onClick={onSubmitAddComment}>등록</button>
          </td>
        </tr>
        </>
  );
}

export default Comment;
