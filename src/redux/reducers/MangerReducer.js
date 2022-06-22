import {ManagerType} from 'redux/constants';
const INIT_STATE = {};

function MangerReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ManagerType.SWP_ATV_REQ:
      return {
        ...state,
        id: action.id,
      };
    case ManagerType.SWP_ATV_RES:
      return {
        name: action.name,
        startTime: action.startTime,
        endTime: action.endTime
      };
    case ManagerType.SWP_ATR_REQ:
      return {
        id: action.id,
        startTime: action.startTime,
        endTime: action.endTime
      };
    case ManagerType.SWP_ATR_RES:
      return {};
    default:
      return state;
  }
}

export default MangerReducer;