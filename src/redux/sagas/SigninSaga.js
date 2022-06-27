import axios from 'axios';
import {LOCAL_STORAGE, ROUTES, LOG} from 'utils/constants';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {SignInType} from 'redux/constants';
import {openAlert} from 'redux/actions/AlertAction';
import {SwpEacRes} from 'redux/actions/SignInAction';


axios.defaults.baseURL = ROUTES.BASE_URL;

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

      if(result.data.data === undefined) {
        console.log('[ROLE] ADMIN');
        yield put(SwpEacRes(''));
        history.push('/admin');
      } else if(result.data.data?.depId !== undefined && result.data.data?.username === undefined) {
        console.log('[ROLE] MANAGER');
        yield put(SwpEacRes(result.data.data));
        history.push('/manager');
      } else {
        console.log('[ROLE] USER');
        yield put(SwpEacRes(result.data.data));
        history.push('/user');
      }
    } else {
      yield put(openAlert('fail', result.data.resMsg));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchAlert() {
  yield takeLatest(SignInType.SWP_EAC_REQ, postSwpEacReq);
}


export default function* signInSaga() {
  yield all([fork(watchAlert)]);
}