import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Comment({ id }) {
  const initComment = [{ commentId: 0, commentAuthor: "", commentContent: "" }];
  const [comment, setComment] = useState(initComment);
  const [username, setUsername] = useState("");
  const [commentIdx, setCommentIdx] = useState(-1);
  const [commentEdit, setCommentEdit] = useState({
    commentcontent: "",
    commentId: 0,
  });
  const [reder, setRender] = useState(0);

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
      const base64EncodedPayload = jwtToken.split(".")[1];
      const payload = atob(base64EncodedPayload);
      const payloadObj = JSON.parse(payload);
      setUsername(payloadObj.sub);
    }
  }, [reder]);

  const onClickEdit = (e) => {
    console.log(e.target.value);
    setCommentIdx(e.target.value);
    setCommentEdit({
      commentId: comment[e.target.value].commentId,
      commentcontent: comment[e.target.value].commentContent,
    });
  };

  // 댓글 삭제
  const onClickDelete = (e) => {
    axios.delete("/board/comment/delete/"+e.target.value, {headers: { 'Authorization': localStorage.getItem('token') },})
    .then(response => {setRender(reder+1)})
    .catch(error =>{});
};

  const onChangeComment = (e) => {
    setCommentEdit({ ...commentEdit, commentcontent: e.target.value });
  };
  const onClickSave = () => {
    console.log(commentEdit);
  };

  return (
    <th className="text-start">
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
                <td style={{ width: "100px", wordWrap: "break-word" }}>
                  {val.commentAuthor}
                </td>
                {commentIdx != idx ? (
                  <>
                    <td style={{ width: "80%" }}>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "80%",
                          wordWrap: "break-word",
                        }}
                      >
                        {val.commentContent}
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
                        value={commentEdit.commentcontent}
                        onChange={onChangeComment}
                      ></textarea>
                    </td>
                    <td style={{ width: "100px" }}>
                      <button onClick={onClickSave}>완료</button>
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        );
      })}
    </th>
  );
}

export default Comment;
