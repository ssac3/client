import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {style} from './AttendenceMngmentStyle';
import Label from 'components/Label';
import {MdModeEditOutline} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {SwpRavReq} from 'redux/actions/ManagerAction';
import {cnvrtDate, cnvrtTime} from 'utils/convertDateTime';
import {MANAGER_APPROVAL_TYPE} from 'utils/constants';

const ListItemComponent = ({item, onClickATR}) => {
  return(
    <ListItemContainer>
      <ItemContainer>{item.username}</ItemContainer>
      <ItemContainer>{item.name}</ItemContainer>
      <ItemContainer>{cnvrtDate(new Date(item.rStartTime))}</ItemContainer>
      <ItemContainer>{item.contents}</ItemContainer>
      <ItemContainer>{cnvrtTime(new Date(item.rStartTime)).concat('~').concat(cnvrtTime(new Date(item.rEndTime)))}</ItemContainer>
      <ItemContainer>{cnvrtTime(new Date(item.startTime)).concat('~').concat(cnvrtTime(new Date(item.endTime)))}</ItemContainer>
      <ItemContainer>
        <Label type={MANAGER_APPROVAL_TYPE[Number(item.approvalFlag)].title}/>
      </ItemContainer>
      <ItemContainer>
        <IconLayout>
          <MdModeEditOutline size={20} onClick={onClickATR}/>
        </IconLayout>
      </ItemContainer>
    </ListItemContainer>
  );
};


export const AttendenceMngment = ({onClickATR}) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState([]);

  const selector = useSelector((state) => state.MangerReducer);
  useEffect(() => {
    console.log('RAV');
    dispatch(SwpRavReq());
  }, []);


  useEffect(() => {
    if(selector.data.length > 0 && selector.data[0]?.rId !== undefined) {
      setInfos(selector.data);
    }
  }, [selector]);

  return (
    <Wrapper>
      <TitleContainer/>

      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>조정 요청일</InnerLayout>
            <InnerLayout>사유</InnerLayout>
            <InnerLayout>조정 요청 시간</InnerLayout>
            <InnerLayout>실제 출/퇴근 시간</InnerLayout>
            <InnerLayout>상태</InnerLayout>
            <InnerLayout>수정</InnerLayout>
          </HeaderContainer>

          {infos?.map((item) => (
            <ListItemComponent key={item.rId} item={item} onClickATR={() => onClickATR(item.rId)}/>
          ))}
        </ListContainer>
      </Container>
    </Wrapper>
  );
};
AttendenceMngment.propTypes = {
  onClickATR: PropTypes.func.isRequired,
};

ListItemComponent.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onClickATR: PropTypes.func.isRequired,
};

const {
  Wrapper,
  TitleContainer,
  Container,
  ListContainer,
  HeaderContainer,
  InnerLayout,
  ListItemContainer,
  ItemContainer,
  IconLayout,
} = style;