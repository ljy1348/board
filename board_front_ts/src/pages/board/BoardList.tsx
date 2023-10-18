import React,{useState,useEffect} from 'react';
import IBoardList from '../../types/BoardList';
import axios from 'axios';
import { Link,useNavigate, useParams  } from 'react-router-dom';
import { Pagination,Stack } from '@mui/material';

function BoardList({}) {

    const initBoardList:IBoardList[] = [{id: 0,
        title: "",
        author: "",
        insertDate: "",
        vote: 0,
        attachmentsData: "",
        isPinned: false,
        commentCount: 0}]

    const initBoardPage = {page:(Number(useParams<{page:string}>().page)), size:10};

   
    const[boardList, setBoardList] = useState<IBoardList[]>(initBoardList);
    const[boardPage, setBoardPage] = useState(initBoardPage);
    const[maxPage, setMaxPage] = useState(0);
    const navi = useNavigate();

    useEffect(()=>{
      console.log(boardPage);
      axios.get("/board?page="+(boardPage.page-1)+"&size="+boardPage.size)
      .then(response=>{setBoardList(response.data);})
      // .then(response=>{console.log(response)})
      .catch(error=>{console.log(error)})
    },[boardPage]);

    const onChangePage = (e:any) => {
      const a = Number(e.target.outerText);
      setBoardPage({...boardPage, page:a});
      navi("/board/"+a);
    }

    

  return (
    <div className='container'>
        <h1>게시판</h1>

        <table className="table table-hover">
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
        <td><Link to={"/board/r/"+val.id}><span>{val.title}</span></Link> <span>{val.commentCount}</span>
        {/* {val.attachmentsData != "" &&
        <span>첨부파일 표시</span>} */}
        </td> 
        <td>{val.author}</td>
        <td>{val.insertDate}</td>
      </tr>
    ))
    }
  </tbody>
  
</table>
    <Link to={"/board/write"}><button className="btn btn-outline-secondary">글쓰기</button></Link>
    <div className='m-3'><Stack alignItems="center"><Pagination count={10} color="primary" defaultPage={1} 
    showFirstButton showLastButton onChange={onChangePage}/></Stack></div>
    </div>
  )
}

export default BoardList