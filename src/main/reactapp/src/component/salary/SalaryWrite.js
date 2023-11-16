import axios from 'axios';
import React, { useState, useEffect } from 'react';

import styles from '../../css/Table.css';
// --------- mui ---------//
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// ----------사원 테이블 ----//
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from "@mui/material/Pagination";
import RegisterEmp from "../employee/RegisterEmp";
import ApprovalModal from "../approval/ApprovalModal";
// -----------------------//
dayjs.locale('ko');

export default function SalaryWrite(props) {
  const [isOn, setIsOn] = useState(false);

  const modalController = () => {
    setIsOn(!isOn);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [accountNumber, setAccountNumber] = useState('');
  const [empNumber, setEmpNumber] = useState('');
  const [empName, setEmpName] = useState('');
  const [rankNumber, setRankNumber] = useState('');
const data = {
      empNo: empNumber,
      slryDate: selectedDate,
      slryPay: Number(amount),
      slryType: Number(paymentType),
    };
    console.log(data);
  const handleSubmit = () => {
    // Prepare data to send to the server
    console.log(data);

    // Use Axios to send the data to the server
    axios.post("/salary/post", data)
      .then((response) => {
        console.log("데이터가 성공적으로 전송되었습니다.", response);
        // Perform any actions or redirection on success.
      })
      .catch((error) => {
        console.error("데이터 전송 중 오류가 발생했습니다.", error);
        // You can add error handling logic here.
      });
  };

  function getrankLabel(empRk) {
    switch (empRk) {
      case 1:
        return "사원";
      case 2:
        return "주임";
      case 3:
        return "대리";
      case 4:
        return "과장";
      case 5:
        return "팀장";
      case 6:
        return "부장";
      default:
        return "직급";
    }
  }

  const rkList = ["대기", "사원", "주임", "대리", "과장", "팀장", "부장"];
  const dptList = ['인사팀', '기획팀(PM)', '개발팀', 'DBA팀'];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const [empList, setEmpList] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, dptmNo: 0, sta: '0', totalCount: 0, totalPages: 0 });

  useEffect(() => {
    getList();
  }, [pageInfo.page, pageInfo.sta, pageInfo.dptmNo]);

  const getList = (event) => {
    axios
      .get("/employee/findAll", { params: pageInfo })
      .then((r) => {
        setEmpList(r.data.someList);
        setPageInfo({ ...pageInfo, totalCount: r.data.totalCount, totalPages: r.data.totalPages });
      })
      .catch((e) => {
        console.log(e);
      });
  };

    return (<>
    <div className="contentBox">
        <div className="pageinfo"><span className="lv0">급여관리</span> > <span className="lv1">급여지급 상세보기</span></div>


          <div>
            {/* 급여지급 관련 입력구역 */}
            <div className="inputbox">
                <form className="boardForm">
                    <div className="maincontent">
                       <div className="inputcontent">
                        <div className="top" style={{display: 'flex' , justifyContent:'space-between'}}>
                           <div className="empNo">
                               <TextField
                                    sx={{ width: '200px', padding: '7px',}}
                                    disabled={true}
                                    size="small"
                                    label="이름(사번)"
                                    type="text"
                                    value={empName !== '' ? empName + "(" + empNumber + ")" : ''}
                                  />
                          </div>

                          <div className="rank">
                                <TextField
                                     sx={{ width: '200px', padding: '7px',}}
                                    disabled={true} size="small" label="직급" type="text" value={getrankLabel(rankNumber)} />
                          </div>

                          <div className="accountNo">
                                <TextField
                                     sx={{ width: '300px', padding: '7px',}}
                                    disabled={true} size="small" label="계좌번호" type="text" value={accountNumber} />
                          </div>
                        </div>
                        <div className="bottom" style={{display: 'flex', justifyContent:'space-between'}}>
                          <div className="Day">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    sx={{ width: '300px', padding: '7px',}}

                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    renderInput={(params) => <TextField {...params} label="날짜" />}
                                    format="YYYY-MM-DD"
                                    />
                              </LocalizationProvider>
                          </div>

                          <div className="value">
                                <TextField
                                     sx={{ width: '200px', padding: '7px',}}
                                    size="small" label="금액" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                          </div>

                          <div className="value">
                               <TextField
                                    sx={{ width: '200px', padding: '7px',}}
                                    size="small" label="지급 타입" type="number" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />
                           </div>
                          <div className="btn">
                            <Button
                                 sx={{ width: '200px', padding: '7px',}}
                                className="btn1"  variant="contained" color="primary" onClick={modalController}>결재요청</Button>
                           </div>
                        </div>

                        </div>

                    </div>
                </form>
            </div>
            {/* 사원 목록 출력구역 */}
            <div className="texttitle"><h3> 사원 목록 </h3></div>
            <TableContainer style={ {     height: '525px' ,
                                          padding: '0px 20px 0px 20px'  } } component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">사원번호</TableCell>
                    <TableCell align="right">이름</TableCell>
                    <TableCell align="right">전화번호</TableCell>
                    <TableCell align="right">사원성별</TableCell>
                    <TableCell align="right">계좌번호</TableCell>
                    <TableCell align="right">직급</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empList.map((emp) => (
                    <TableRow
                      onClick={() => {
                        setEmpName(emp.empName);
                        setAccountNumber(emp.empAcn);
                        setEmpNumber(emp.empNo);
                        setRankNumber(emp.empRk);
                      }}
                      key={emp.name}

                    >
                      <TableCell align="right">{emp.empNo}</TableCell>
                      <TableCell align="right">{emp.empName}</TableCell>
                      <TableCell align="right">{emp.empPhone}</TableCell>
                      <TableCell align="right">{emp.empSex}</TableCell>
                      <TableCell align="right">{emp.empAcn}</TableCell>
                      <TableCell align="right">{getrankLabel(emp.empRk)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
              <Pagination page={pageInfo.page} count={pageInfo.totalPages} onChange={(e, value) => {
                setPageInfo({ ...pageInfo, page: value });
              }} />
            </div>
            {isOn ? (
              <ApprovalModal
                data={data}
                aprvType={
                  data.slryType === 1
                    ? 18
                    : data.slryType === 2
                    ? 19
                    : data.slryType === 3
                    ? 20
                    : data.slryType === 4
                    ? 21
                    : data.slryType === 5
                    ? 22
                    : data.slryType === 6
                    ? 23
                    : data.slryType === 7
                    ? 24
                    : data.slryType === 8
                    ? 25
                    : null
                }
                targetUrl="/salary/post"
                successUrl="/salary/write"
                modalControll={modalController}
              />
            ) : null}
          </div>
        </div>
    </>
  );
}
