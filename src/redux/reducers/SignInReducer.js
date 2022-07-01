import {SignInType, SignOutType} from 'redux/constants';
const INIT_STATE = {};

function SignInReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SignInType.SWP_EAC_REQ:
      return {
        username: action.username,
        password: action.password,
        history: action.history
      };
    case SignInType.SWP_EAC_RES:
      return {
        data: action.data
      };
    case SignOutType.SWP_EAS_REQ:
      return {
        history: action.history
      };
    case SignOutType.SWP_EAS_RES:
      return {};
    default:
      return state;
  }
}

export default SignInReducer;