import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";
import "../css/BoardUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BoardUp() {
  const navigate = useNavigate();

  // 인증 처리(로그인 한 사람만 들어올 수 있도록)
  // 페이지 접속 인증
    useEffect(()=>{
      const startTime = performance.now();
      const currentTime = Date.now() / 1000;
      if (localStorage.getItem('exp') <= currentTime) localStorage.removeItem('token');
      if (localStorage.getItem('token') == null) {
        return navigate("/login");
      }
      axios.get('/api/user/token', {headers: { 'Authorization': localStorage.getItem('token') }} )
          .then(response => {
            })
            .catch(error => {
              if (error.message === "Request failed with status code 403") {
                navigate(-1);
              }
            })
            const lastTime = performance.now();
            console.log(lastTime-startTime);
    },[]);

  const initBoard = { title: "", content: "", attachmentsData: "" };
  const [board, setBoard] = useState(initBoard);
  const formdata = new FormData();

  // 이미지 붙여넣기
  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          const file = await loader.file;
          const reader = new FileReader();
          return new Promise((resolve, reject) => {
            reader.addEventListener("load", () => {
              resolve({ default: reader.result });
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        },
      };
    };
  }

//   제목 바인딩 함수
  const onChangeTitle = (e) => {
    setBoard({ ...board, title: e.target.value });
  };

//   파일 첨부 바인딩 함수
  const onChangeFile = (e) => {
    if (e.target.files[0] != null) {
      const meta = e.target.files[0].name;
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        console.log(base64String);
        setBoard({ ...board, attachments: base64String, attachmentsData:meta });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setBoard({ ...board, attachments: "", attachmentsData: "" });
    }
  };


//   게시글 등록 함수
  const onSubmitEvent = () => {
    console.log(board);
    axios
      .put("/board/up", board, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        navigate("/board");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   html 본문
  return (
    <div className="container">
      <h1>글쓰기</h1>
      <br />
      <br />
      <h3>제목</h3>
      <input
        type="text"
        onChange={onChangeTitle}
        value={board.title}
        name="title"
      ></input>
      <h3>내용</h3>
      <CKEditor
        config={{
          language: "ko",
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
        editor={ClassicEditor}
        data="<p></p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(event, editor) => {
          setBoard({ ...board, content: editor.getData() });
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
      <input type="file" onChange={onChangeFile} name="file"></input>
      <button onClick={onSubmitEvent}>서브밋</button>
    </div>
  );
}

export default BoardUp;
