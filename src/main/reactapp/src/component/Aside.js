import { Link }from "react-router-dom" //
import styles from '../css/aside.css';
import axios from 'axios';
import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';

export default function Aside( props ){
//useLocation을 이용해서 현재 페이지의 pathname을 가져와서 / 문자를 제거한 1번인덱스를 추출
 const location = useLocation().pathname.split('/')[1];
 console.log(location)

//location이 null이면 employee를 기본값으로 셋팅, !null이면 location값
let currentMenu = location == '' ? 'employee' : location;
 console.log(currentMenu)

    // 로그아웃버튼을 눌렀을때 실행되는 함수
    const logout = (e) => {
        axios
            .get('/member/logout')
            .then( r => {
                if(r.data){
                    alert('로그아웃 되었습니다.')
                    sessionStorage.removeItem('login_token')
                    window.location.reload();   // 새로고침
                }
            })
    }

    const [isAttendance, setAttendance] = useState(false);
    console.log("현재상태 :: "+ isAttendance);
    useEffect (() =>{},[isAttendance])

    //1. 출근기록 - 초기값은 설정

    const changeAttendance = (e)=>{

        if(isAttendance) { //출근상태(true)면
            if(window.confirm("퇴근하시나요?")){
                 setAttendance(!isAttendance);
                 console.log(isAttendance);
            }
            axios.put('/attendance/', {
                empNo: '2311005'
            })
            .then((r)=>{ console.log(r.data);})

        } else { //퇴근상태(false)면
            alert(" Have a Wonderful day! ")
            setAttendance(!isAttendance);
            console.log(isAttendance);
            axios.post('/attendance/', {
                        empNo: '2311005',
                        attdWrst : new Date().toLocaleString()
                    })
                .then( r=>{ console.log(r.data); })
        }



    }

    // 로그인 상태를 저장할 상태변수 선언
    let [login, setLogin] = useState( null );

    // 회원정보 호출[로그인 여부 확인]
       useEffect( () => {
           axios.get('/employee/get')
               .then(r => { console.log('login get')
                   // 2. 만약에 로그인이 되어있으면
                   if(r.data != ''){
                       // 브라우저 세션/쿠키
                           // localstorage vs sessionstorage
                           // 모든 브라우저 탭/창 공유, 브라우저가 꺼져도 유지, 자동로그인 기능
                           //                      vs
                           // 탭/창 종료되면 사라짐, 로그인 여부확인
                           // 세션/쿠키 저장 : .setItem(key,value)
                           // 세션/쿠키 호출 : .getItem(key)
                           // 세션/쿠키 제거 : .removeItem(key)
                       sessionStorage.setItem('login_token', JSON.stringify(r.data));
                       setLogin(JSON.parse(sessionStorage.getItem('login_token') ) );
                       setLogin(r.data);
                   }
               })

       }, [] )


    // 메뉴 css 코드
    const [activeMenu, setActiveMenu] = useState('menu1');

    const clickMenu = (e) => {
      const clickedMenuItem = e.currentTarget;
      setActiveMenu(clickedMenuItem.id);
    };





    return(<>
        <aside className="maside">
        	<div className="logobox"><Link to='/'><img src="../../logo_is.png"/></Link></div>
        		{/*-- 사이드 메뉴 --*/}

                <ul className="nav">
                {/*user*/}
                {currentMenu === 'employee' && (
                <>
                    <li className="tmenu">인사관리</li>
                    <li id="menu1" onClick={clickMenu} className={activeMenu === 'menu1' ? 'smenu' : ''}><Link to='/employee/list'>사원 조회</Link></li>
                    <li id="menu2" onClick={clickMenu} className={activeMenu === 'menu2' ? 'smenu' : ''}><Link to='/employee/register'>사원 등록</Link></li>
                    <li id="menu3" onClick={clickMenu} className={activeMenu === 'menu3' ? 'smenu' : ''}><Link to='/employee/details'>사원 수정</Link></li>
                    <li id="menu4" onClick={clickMenu} className={activeMenu === 'menu4' ? 'smenu' : ''}><Link to='/employee/searchemp'>사원 검색</Link></li>
                    <li><Link to='/employee/retemplist'>퇴사 사원 조회</Link></li>
                    <li><Link to='/leaveofabsenceRequest/write'>휴직 사원 조회</Link></li>
                    <li><Link to='/leaveofabsenceRequest/write'>사원 휴직기간 등록</Link></li>
                    <li><Link to='/leaveofabsenceRequest/write'>사원 휴직기간 수정</Link></li>
                </>
                )}

                {currentMenu === 'teamProject' && (
                <>
                   <li className="tmenu">프로젝트팀관리</li>
                   <li id="menu1" onClick={clickMenu} className={activeMenu === 'menu1' ? 'smenu' : ''}><Link to='/teamProject'>프로젝트팀 등록</Link></li>
                   <li id="menu2" onClick={clickMenu} className={activeMenu === 'menu2' ? 'smenu' : ''}><Link to='/teamProject/listAll'>프로젝트팀 조회/삭제</Link></li>
                   <li id="menu3" onClick={clickMenu} className={activeMenu === 'menu3' ? 'smenu' : ''}><Link to='/teamProject/teammember/write'>프로젝트 팀원 등록</Link></li>

                </>)}

                {currentMenu === 'attendance' && (
                <>
                   <li className="tmenu">근태관리</li>
                   <li id="menu1" onClick={clickMenu} className={activeMenu === 'menu1' ? 'smenu' : ''}><Link to='/attendance'>전체 근무현황</Link></li>
                   <li id="menu2" onClick={clickMenu} className={activeMenu === 'menu2' ? 'smenu' : ''}><Link to='/attendance/pcalendar'>개인 근무현황 캘린더</Link></li>
                   <li id="menu3" onClick={clickMenu} className={activeMenu === 'menu3' ? 'smenu' : ''}><Link to='/attendance/dall'>전체 출결현황</Link></li>
                   <li id="menu4" onClick={clickMenu} className={activeMenu === 'menu4' ? 'smenu' : ''}><Link to='/attendance/dcalendar'>개인 출결 캘린더</Link></li>
                   <li id="menu5" onClick={clickMenu} className={activeMenu === 'menu5' ? 'smenu' : ''}><Link to='/attendance/sickleaveRequestwrite'>병가신청</Link></li>
                    <li id="menu9" onClick={clickMenu} className={activeMenu === 'menu9' ? 'smenu' : ''}><Link to='/attendance/leaveRequestwrite'>개인 연차신청</Link></li>
                   <li id="menu7" onClick={clickMenu} className={activeMenu === 'menu7' ? 'smenu' : ''}><Link to='/attendance/leaveRequestMe'>개인 연차/병가/휴직 내역</Link></li>
                   <li id="menu8" onClick={clickMenu} className={activeMenu === 'menu8' ? 'smenu' : ''}><Link to='/attendance/leaveRequestlist'>전체 연차/병가/휴직 내역 </Link></li>

                </>)}

                {currentMenu === 'salary' && (
                <>
                   <li className="tmenu">급여관리</li>
                   <li id="menu1" onClick={clickMenu} className={activeMenu === 'menu1' ? 'smenu' : ''}><Link to='/salary'>개인 급여내역</Link></li>
                   <li id="menu2" onClick={clickMenu} className={activeMenu === 'menu2' ? 'smenu' : ''}><Link to='/salary/list'>전체 급여내역</Link></li>
                   <li id="menu3" onClick={clickMenu} className={activeMenu === 'menu3' ? 'smenu' : ''}><Link to='/salary/write'>급여 등록</Link></li>
                </>)}


                {currentMenu === 'approval' && (
                <>
                   <li className="tmenu">결재관리</li>
                   <li id="menu1" onClick={clickMenu} className={activeMenu === 'menu1' ? 'smenu' : ''}><Link to='/approval'>전체 결재 조회</Link></li>
                   <li id="menu2" onClick={clickMenu} className={activeMenu === 'menu2' ? 'smenu' : ''}><Link to='/reconsider'>개별 상신한 리스트 조회</Link></li>
                   <li id="menu3" onClick={clickMenu} className={activeMenu === 'menu3' ? 'smenu' : ''}><Link to='/approvalview'>개별 결재한 리스트 조회</Link></li>
                </>)}

            </ul>
            {
                login == null
                ? (<>
                    <div className="templogin"><Link to='/member/Login'> 로그인</Link></div>
                </>)
                :(<>
                    <div className="templogin" onClick={logout}> 로그아웃 </div>
                </>)
            }
            <div className="attendence" onClick={ changeAttendance }><i class="fa-solid fa-arrow-right-to-bracket"></i>
            {
                isAttendance == true ? (<>퇴 근</>) : (<>출 근</>)
            }
            </div>
            {/*<div className="attendence" onClick="changeState()"><i class="fa-solid fa-arrow-right-to-bracket"></i> 출 근</div>*/}
        </aside>

    </>)
}