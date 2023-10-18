import React, { useState, useEffect } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";
import "../../css/table/BoardWrite.css";
import axios from 'axios';
import { Link,useNavigate, useParams  } from 'react-router-dom';

function BoardWrite() {

  const initBoard = {id:0 ,title:"", content:"", attachmentsData:""}
  const [board, setBoard] = useState(initBoard);
  const [fileList, setFileList] = useState<File[] | null>([]);
  const navi = useNavigate();
  const {id} = useParams();
  const [render, setRender] = useState(0);


    // page 로딩 될 때 로그인 확인(토큰 만료 확인)
    useEffect(()=>{
      const startTime = performance.now();
      const currentTime = Date.now() / 1000;
      const tokenExp = Number(localStorage.getItem('exp')) ?? 0;
      if (tokenExp <= currentTime) localStorage.removeItem('token');
      if (localStorage.getItem('token') == null) {
        return navi("/login");
      }

      axios.get('/board/user/edit/'+id, {headers: { 'Authorization': localStorage.getItem('token') }} )
          .then(response => {
            setBoard({...board, id:response.data.id, title:response.data.title, content:response.data.content});
            // setBoard(response.data);
            setRender(1);
          })
            .catch(error => {
              if (error.message === "Request failed with status code 403") {
                navi(-1);
              }

            })

            const lastTime = performance.now();
            console.log(lastTime-startTime);
    },[]);

    // 이미지 붙여넣기
    function MyCustomUploadAdapterPlugin(editor:any) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader:any) => {
        return {
          
          upload: async () => {
            const file = await loader.file;
            const reader = new FileReader();
            const fileType:string = file.type;
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

    // input 파일 변할때
    const onChangeFile = (e:any) => {
      if (e.target.files[0] != null) {  
        setFileList(e.target.files);
        setBoard({...board, attachmentsData:board.attachmentsData+"file"})
      } else {
        setFileList(null);
        const str = board.attachmentsData.replace("file","")
        setBoard({...board, attachmentsData:str})
      }
    };

    // 게시글 제목
    const onChangeTitle = (e:any) => {
      setBoard({...board, title:e.target.value});
    }

    // 저장 누를때
    const onClickSubmit = () => {
      const formData = new FormData;
      formData.append("board",JSON.stringify(board));
      if (fileList) {
        formData.append("file", fileList[0]);
      }
      console.log(formData.get('board'));
      axios.put("/board/user/edit", formData, {headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem("token")
      }})
      .then((response)=>{navi("/board/1")})
      .catch((error)=>{   
        const data:string = error.response.data;
        if (data.includes("could not execute statement")) alert("제목이 너무 길거나 형식이 맞지 않습니다.")})
    }



  return (
    <div className='container'>
      <h1>글쓰기</h1>

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
        data={board.content}
        onChange={(event, editor:any) => {
          if (render > 0)
          setBoard({...board, content:editor.getData()});
        }}
      />
      <br/>
          <input type="file" name="filename" onChange={onChangeFile}></input>
          <button type='submit' onClick={onClickSubmit}>저장</button>
    </div>
  )
}

export default BoardWrite