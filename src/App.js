import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from 'pages/manager/dashboard';
import EmpManagement from 'pages/admin/emp_mangement';
import AtdcManagement from 'pages/user/attendence';
import SignIn from 'pages/signin';
import Header from 'components/Header';
import Navigation from './components/Navigation';
import {ADMIN_MENU, MANAGER_MENU, USER_MENU} from 'utils/constants/menuList';
import {CLIENT_URL} from 'utils/constants/api';
import Setting from 'pages/manager/setting';
import {SwpAtvReq} from './redux/actions/ManagerAction';
import {useDispatch, useSelector} from 'react-redux';
import Alert from 'components/Alert';


function getMenu(role) {
  switch (role) {
    case 'admin':
      return ADMIN_MENU;
    case 'manager':
      return MANAGER_MENU;
    default:
      return USER_MENU;
  }
}

function App() {
  const dispatch = useDispatch();
  const swpAtvRes = useSelector((state) => state.MangerReducer);
  const alert = useSelector((state) => state.AlertReducer);
  const roleURL = window.location.href.replace(CLIENT_URL, ''); // url 변경
  const [select, setSelect] = useState(getMenu(roleURL) || {});
  const [setting, setSetting] = useState(false);
  const onClickMenu = (e) => {
    const change = getMenu(roleURL).map(value => (value.id === Number(e.target.id) ? {
      ...value,
      check: true
    } : {...value, check: false}));
    setSelect(change);
  };
  const onClickSubMenu = (e) => {
    const target = select.map(value => value.sub.map(v => (v.id === Number(e.target.id) ? {
      ...v,
      check: true
    } : {...v, check: false})));

    const result = select.map((v, i) => v.sub.id === target[i].id && {...v, sub: target[i]});
    setSelect(result);
  };
  const position = () => {
    return (select.filter(v => v.check)[0].sub.length > 0) ? (65 + 238) : 185;
  };
  const onClickSetting = () => {
    setSetting(!setting);
  };

  useEffect(() => {
    dispatch(SwpAtvReq(1)); // 로그인 이후 사용자(근태관리자) 부서 ID로 바인딩 필요
  }, []);

  useEffect(() => {
    getMenu(roleURL);
  }, [roleURL]);

  useEffect(() => {
    console.log(swpAtvRes);
  }, [swpAtvRes]);

  return (
    <>
      {alert.open && <Alert type={alert.type} msg={alert.msg}/>}
      {roleURL !== '' && (
        <>
          <Header role={roleURL} setting={onClickSetting}/>
          <Navigation
            role={roleURL}
            menu={select}
            onClickMenu={onClickMenu}
            onClickSubMenu={onClickSubMenu}
          />
        </>
      )}
      {setting && <Setting open={onClickSetting}/>}

      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={SignIn}/>
          <Wrap p={position()}>
            <Route path={'/admin'} render={() => <EmpManagement/>}/>
            <Route path={'/manager'} render={() => <Dashboard/>}/>
            <Route path={'/user'} render={() => <AtdcManagement/>}/>
          </Wrap>
        </Switch>
      </BrowserRouter>


    </>
  );
}

const Wrap = styled.div`
  ${({theme}) => theme.flexSet()};
  position: absolute;
  padding: 12px 100px;
  top: 70px;
  left: ${({p}) => p}px; // 수정
  width: calc(100% - (65px + 238px));
  height: calc(100% - 70px);
`;
export default App;
