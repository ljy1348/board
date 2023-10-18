import React, { useState } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";

function BoardWrite() {

  const [board, setBoard] = useState("");


    // 이미지 붙여넣기
    function MyCustomUploadAdapterPlugin(editor:any) {
      console.log("이미지 붙여놓기 함수 실행")
      editor.plugins.get("FileRepository").createUploadAdapter = (loader:any) => {
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



  return (
    <div className='container'>
      <h1>글쓰기</h1>


      <CKEditor
        config={{
          language: "ko",
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
        editor={ClassicEditor}
        data="<p></p>"
        onReady={(editor) => {
        }}
        onChange={(event, editor:any) => {
          setBoard(editor.getData());
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />


    </div>
  )
}

export default BoardWrite