import React,{useState,useEffect} from 'react';
import IBoardList from '../../types/BoardList';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';

function BoardList() {

    const initBoardList:IBoardList[] = [{id: 0,
        title: "",
        author: "",
        insertDate: "",
        vote: 0,
        attachmentsData: "",
        isPinned: false,
        commentCount: 0}]

    const[boardList, setBoardList] = useState<IBoardList[]>(initBoardList);

        useEffect(()=>{
            axios.get("board")
            .then(response=>{setBoardList(response.data)})
            .catch(error=>{console.log(error)})
        })

  return (
    <div className='container'>
        <h1>게시판</h1>

        <table className="table">
  <thead>
    <tr>
      <th scope="col">번호</th>
      <th scope="col">제목</th>
      <th scope="col">작성자</th>
      <th scope="col">작성날짜</th>
    </tr>
  </thead>
  <tbody>
    {boardList.map((val, idx)=>(
        <tr key={val.id}>
        <td>{val.id}</td>
        <td><Link to={"/board/"+val.id}><div>{val.title}</div></Link></td>
        <td>{val.author}</td>
        <td>{val.insertDate}</td>
      </tr>
    ))
    }
  </tbody>
  
</table>
    <Link to={"/board/write"}><button className="btn btn-outline-secondary">글쓰기</button></Link>

    </div>
  )
}

export default BoardList