import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Pagination from "@mui/material/Pagination";

export default function LeaveRequestMain(props) {
    // 0. 컴포넌트 상태변수 관리
   let [ pageDto , setPageDto ] = useState( {
                  someList : [] , totalPages : 0 , totalCount : 0
    } );
   // 0. 스프링에게 전달할 객체
          const [ pageInfo , setPageInfo ] = useState( {
              page : 1 ,  view : 5 , empNo : "2311006" // 추후 세션으로 가져와 변경
          }); console.log( pageInfo );

    /*
    // 3. 현재 로그인된 회원의 번호
    const login = JSON.parse(sessionStorage.getItem('login_token'));
    const empNo = login != null ? login.empNo : null;
    */

    // 특정 레코드 클릭시 해당 레코드 상세보기
    const loadView = ( lrqNo ) => {
                    window.location.href = '/leaveRequest/view?lrqNo='+lrqNo
                }

     // 1-1.  axios를 이용한 스프링의 컨트롤과 통신
               const getlrqMe = (e) => {
                     axios.get('/leaveRequest/get' , { params : pageInfo } )
                           .then( r =>{  // r.data : PageDto  // r.data.boardDtos : PageDto 안에 있는 boardDtos
                                setPageDto( r.data ); // 응답받은 모든 게시물을 상태변수에 저장 // setState : 해당 컴포넌트가 업데이트(새로고침/재랜더링/return재실행)
                             });
                 }
 // 1-2 컴포넌트가 생성될 때 // + 의존성 배열 : page 변경될떄 // + 의존성 배열 : view 변경될 때
                useEffect( () => { getlrqMe(); }, [ pageInfo.page , pageInfo.view ] );

                // 2. 페이지 번호를 클릭했을 때.
                    const onPageSelect = ( e , value )=>{
                            pageInfo.page = value; // 클릭한 페이지번호로 변경
                             setPageInfo( { ...pageInfo } ); // 새로고침 [ 상태변수의 주소 값이 바뀌면 재랜더링 ]
                   }

    function getlrqTypeLabel(lrqType) {
                  switch (lrqType) {
                    case 1:
                      return "휴직";
                    case 2:
                      return "연차";
                    case 3:
                      return "병가";
                    default:
                      return "알 수 없는 타입";
                  }
    }
        function getlrqSrtypeLabel(lrqSrtype) {
                      switch (lrqSrtype) {
                        case 0:
                          return "무급";
                        case 1:
                          return "유급";
                        default:
                          return "알 수 없는 타입";
                      }
    }

    return (<>
            <div class="pageinfo"><span class="lv0">근태관리</span> > <span class="lv1">개인 연차/병가/휴직 내역</span></div>
            <h3>{ /*row.empNo*/ } 이효재(2311006)님 연차보기 ( 추후에 사번으로 이름 찾아서 대입 )</h3>
             <p> page : { pageInfo.page  } totalCount : { pageDto.totalCount  } </p>
             <select
                      value = { pageInfo.view }
                      onChange={ (e)=>{  setPageInfo( { ...pageInfo , view : e.target.value} );  } }
                      >
                        <option value="5"> 5 </option>
                        <option value="10"> 10 </option>
                       <option value="20"> 20 </option>
             </select>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                           <TableCell style={{ width : '10%' }} align="right">번호</TableCell>
                           <TableCell style={{ width : '20%' }} align="right">연차신청날짜</TableCell>
                           <TableCell style={{ width : '20%' }} align="right">연차종료날짜</TableCell>
                           <TableCell style={{ width : '10%' }} align="right">연차유형</TableCell>
                           <TableCell style={{ width : '10%' }} align="right">급여유형</TableCell>
                           <TableCell style={{ width : '10%' }} align="right">결재번호</TableCell>
                        </TableRow>
                   </TableHead>
                          {/* 테이블 내용 구역 */}
                          <TableBody>
                            {pageDto.someList.map((row) => (
                              <TableRow
                                key={row.name}
                               >

                                <TableCell onClick={ ( ) => loadView( row.lrqNo ) } align="right">{row.lrqNo}</TableCell>
                                <TableCell onClick={ ( ) => loadView( row.lrqNo ) } align="right">{row.lrqSt}</TableCell>
                                <TableCell onClick={ ( ) => loadView( row.lrqNo ) } align="right">{row.lrqEnd}</TableCell>
                                <TableCell onClick={ ( ) => loadView( row.lrqNo ) } align="right">{getlrqTypeLabel(row.lrqType)}</TableCell>
                                <TableCell onClick={ ( ) => loadView( row.lrqNo ) } align="right">{getlrqSrtypeLabel(row.lrqSrtype)}</TableCell>
                                <TableCell onClick={ ( ) => loadView( row.lrqNo ) } align="right">{row.aprvNo}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                        <div style = {{ display : 'flex' , flexDirection : 'column' , alignItems : 'center' , margin : '10px' }} >
                                  { /* page : 현재페이지    count : 전체페이지수   onChange : 페이지번호를 클릭/변경 했을떄 이벤트 */}
                                  <Pagination page = { pageInfo.page }  count={ pageDto.totalPages } onChange={ onPageSelect } />
                         </div>

</>)
}