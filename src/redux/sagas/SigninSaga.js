import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {SignInType, SignOutType} from 'redux/constants';
import {openAlert} from 'redux/actions/AlertAction';
import {SwpEacRes, SwpEasRes} from 'redux/actions/SignInAction';


axios.defaults.baseURL = ROUTES.BASE_URL;
const getHeader = () => {
  const headers = { Authorization: LOCAL_STORAGE.get('Authorization')};
  console.log(headers);
  return {
    headers,
  };
};

function eacReq(data) {
  const result = axios
    .post(ROUTES.SWP_EAC_REQ, data)
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAC_REQ).SUCCESS);
      return res;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAC_REQ).ERROR);
      return err;
    });
  return result;
}

function easReq(data) {
  const result = axios
    .get(ROUTES.SWP_EAS_REQ, getHeader(), data)
    .then((res) => {
      console.log(LOG(ROUTES.SWP_EAS_REQ).SUCCESS);
      return res.data;
    })
    .catch((err) => {
      console.log(LOG(ROUTES.SWP_EAS_REQ).ERROR);
      return err;
    });
  return result;
}

function* postSwpEacReq() {
  try {
    const selector = yield select((state) => {
      return state.SignInReducer;
    });
    const {history} = selector;
    const packedData = {username:selector.username, password:selector.password};
    const result = yield call(eacReq, packedData);
    if (result.data.resCode === 0) {
      LOCAL_STORAGE.set('Authorization', result.headers.authorization);
      LOCAL_STORAGE.set('Refresh_token', result.headers.refresh_token);

      if(result.data.data.role === '0') {
        console.log('[ROLE] ADMIN');
        yield put(SwpEacRes('ADMIN'));
        history.push('/admin');
      } else if(result.data.data?.depId !== undefined && result.data.data?.role === '1') {
        console.log('[ROLE] MANAGER');
        LOCAL_STORAGE.set('depId', result?.data?.data.depId);
        yield put(SwpEacRes('MANAGER'));
        history.push('/manager');
      } else if(result.data.data?.role === '2') {
        console.log('[ROLE] USER');
        yield put(SwpEacRes('USER'));
        history.push('/user');
      }
    } else {
      yield put(openAlert('fail', result.data.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* postSwpEasReq() {
  try {
    const selector = yield select((state) => {
      return state.SignInReducer;
    });
    const {history} = selector;
    const result = yield call(easReq);
    console.log(result.resCode);
    if (result.resCode === 0) {
      LOCAL_STORAGE.clear();
      history.push('/');
      yield put(SwpEasRes());
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAlert() {
  yield takeLatest(SignInType.SWP_EAC_REQ, postSwpEacReq);
  yield takeLatest(SignOutType.SWP_EAS_REQ, postSwpEasReq);
}


export default function* signInSaga() {
  yield all([fork(watchAlert)]);
}