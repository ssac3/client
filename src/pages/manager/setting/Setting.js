import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {style} from './SettingStyle';
import {MdOutlineClose} from 'react-icons/md';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {TextField} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import theme from 'styles/theme';
import {cnvrtDateTime, formatter} from 'utils/convertDateTime';
import {SwpAtrReq} from 'redux/actions/ManagerAction';
import {LOCAL_STORAGE} from 'utils/constants';

export const Setting = ({open}) => {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => {
    return state.MangerReducer;
  });
  const startTimeSlice = reducer.startTime.split(':');
  const endTimeSlice = reducer.endTime.split(':');
  const [startTime, setStartTime] = useState(
    new Date(0, 0, 0, startTimeSlice[0], startTimeSlice[1], startTimeSlice[2])
  );
  const [endTime, setEndTime] = useState(
    new Date(0, 0, 0, endTimeSlice[0], endTimeSlice[1], endTimeSlice[2])
  );
  const [workingTime, setWorkingTime] = useState(
    formatter((endTime.getHours() - 1) - startTime.getHours())
      .concat('시간 ')
      .concat(formatter(endTime.getMinutes() - startTime.getMinutes()))
      .concat('분')
  );
  useEffect(() => {
    setWorkingTime(
      formatter(Math.abs((endTime.getHours() - 1) - startTime.getHours()).toString())
        .concat('시간 ')
        .concat(formatter(Math.abs(endTime.getMinutes() - startTime.getMinutes()).toString()))
        .concat('분')
    );
  }, [startTime, endTime]);

  const onClickSubmit = () => {
    dispatch(SwpAtrReq(LOCAL_STORAGE.get('depId'), cnvrtDateTime(startTime), cnvrtDateTime(endTime)));
    open();
  };
  return (
    <Wrap>
      <Container>
        <TextLayout>
          <CloseLayout>
            <MdOutlineClose size={25} onClick={open} style={{cursor: 'pointer'}}/>
          </CloseLayout>
          <h2>정규 출/퇴근 시간</h2>
          <h3>{reducer.name}팀의 출/퇴근 시간입니다.</h3>
          <h4>사원들이 지치지 않도록 유연하게 출/퇴근 시간을 설정할 수 있습니다.</h4>
        </TextLayout>

        <InputWrap>
          <InputLayout>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="출근 시간"
                value={startTime || null}
                ampm={false}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} color={'grey'}/>}
              />
            </LocalizationProvider>
          </InputLayout>
          <InputLayout>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label={'퇴근시간'}
                minTime={startTime}
                value={endTime || null}
                ampm={false}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} color={'grey'}/>}
              />
            </LocalizationProvider>
          </InputLayout>
          <InputLayout>
            <TextField
              readOnly
              label={'근무시간'}
              disabled
              focused={false}
              variant={'outlined'}
              value={workingTime}
            />
          </InputLayout>
        </InputWrap>
        <BtnLayout>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_CC} onClick={open}>취소</Btn>
          <Btn bgColor={theme.colorSet.SECONDARY.GRAY_5B} onClick={onClickSubmit}>확인</Btn>
        </BtnLayout>
      </Container>
    </Wrap>
  );
};

Setting.propTypes = {
  open: PropTypes.func.isRequired,
};

const {
  Container,
  Wrap,
  TextLayout,
  CloseLayout,
  InputWrap,
  InputLayout,
  BtnLayout,
  Btn,
} = style;