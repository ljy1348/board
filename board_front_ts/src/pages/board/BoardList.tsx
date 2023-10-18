import React,{useState,useEffect} from 'react';
import IBoardList from '../../types/BoardList';
import axios from 'axios';
import { Link,useNavigate, useParams  } from 'react-router-dom';
import { Pagination,Stack } from '@mui/material';
import "../../css/table/BoardList.css";

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
    const initMap = {board:initBoardList, maxPage:0};
    const {page} = useParams<{page:string}>();

   
    const[boardList, setBoardList] = useState<IBoardList[]>(initBoardList);
    const[boardPage, setBoardPage] = useState(initBoardPage);
    const[maxPage, setMaxPage] = useState(0);
    const navi = useNavigate();

    useEffect(()=>{
      console.log(page);
      axios.get("/board?page="+(Number(page)-1)+"&size="+boardPage.size)
      .then((response:any)=>{
        console.log(response);
        // console.log(response.data);
        setBoardList(response.data.board);
        setMaxPage(response.data.maxpage);
      })
      .catch(error=>{console.log(error)})
    },[page]);

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
    {boardList.map((val, idx)=>{
      const date = new Date(val.insertDate);
      const formattedDate = `${date.getFullYear()-2000}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      return (
        <tr key={val.id}>
        <td>{val.id}</td>
        <td><Link to={"/board/r/"+val.id}><span className='title'>{val.title}</span></Link> <span className='commentCount'>{val.commentCount}</span>
        {val.attachmentsData != "" &&
        <span><img src='/img/file.png'></img></span>}
        </td> 
        <td>{val.author}</td>
        <td>{formattedDate}</td>
      </tr>
      );
      })
    }
  </tbody>
  
</table>
    <Link to={"/board/write"}><button className="btn btn-outline-secondary">글쓰기</button></Link>
    <div className='m-3'><Stack alignItems="center"><Pagination count={maxPage} color="primary" page={boardPage.page} 
    showFirstButton showLastButton onChange={onChangePage}/></Stack></div>
    </div>
  )
}

export default BoardList