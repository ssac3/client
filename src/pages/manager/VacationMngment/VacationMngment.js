import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {style} from './VacationMngmentStyle';
import { Calendar } from 'antd';
import {MdSearch, MdCalendarToday} from 'react-icons/md';
import Dropbox from 'components/Dropbox';
import {VACATION_TYPE, APPROVAL_TYPE} from 'utils/constants';

const InputComponent = ({type}) => {
  const [open, setOpen] = useState(false);
  const onClickCalendar = () => {
    setOpen(!open);
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return(
    <SearchContainer>
      {type === 'text' &&
        <MdSearch size={25} color={'white'}/> }
      <SearchInput/>
      {type === 'date' &&
        <MdCalendarToday
          size={25}
          color={'white'}
          onClick={onClickCalendar}
          style={{cursor:'pointer'}}
        />}
      {open &&
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          style={{width:300, position:'absolute', left:0, top:45, zIndex:1}}
        />}
    </SearchContainer>
  );
};

const ListItemComponent = ({onClickDetail}) => {
  return(
    <ListItemContainer>
      <ItemContainer>54142910</ItemContainer>
      <ItemContainer>사원</ItemContainer>
      <ItemContainer>2022-06-22</ItemContainer>
      <ItemContainer>전일 휴가</ItemContainer>
      <ItemContainer>개인 사유</ItemContainer>
      <ItemContainer>승인 대기</ItemContainer>
      <ItemContainer><BtnContainer onClick={onClickDetail}>상세보기</BtnContainer></ItemContainer>
    </ListItemContainer>
  );
};

const InfoInputComponent = () => {
  return(
    <InfoInputContainer></InfoInputContainer>
  );
};

const UserInfoComponent = ({detail}) => {
  return(
    <UserInfoContainer>
      {detail && (
        <>
          <InnerInfoContainer>

            <InnerInfoItem>사원번호</InnerInfoItem>
            <InnerInfoItem>사원명</InnerInfoItem>
            <InnerInfoItem><InfoInputComponent/></InnerInfoItem>
            <InnerInfoItem><InfoInputComponent/></InnerInfoItem>

            <InnerInfoItem>휴가신청일</InnerInfoItem>
            <InnerInfoItem>신청 휴가시간</InnerInfoItem>
            <InnerInfoItem><InfoInputComponent/></InnerInfoItem>
            <InnerInfoItem><InfoInputComponent/></InnerInfoItem>

            <InnerInfoItem>사유</InnerInfoItem>
            <InnerInfoItem>남은 휴가시간</InnerInfoItem>
            <InnerInfoItem><InfoInputComponent/></InnerInfoItem>
            <InnerInfoItem><InfoInputComponent/></InnerInfoItem>

            <InnerInfoItem>상태</InnerInfoItem>
            <InnerInfoItem/>
            <InnerInfoItem><InfoInputComponent/></InnerInfoItem>
          </InnerInfoContainer>
          <StoreBtn>저장</StoreBtn>
        </>

      )}

    </UserInfoContainer>
  );
};

export const VacationMngment = () => {
  const [openDropbox, setOpenDropbox] = useState(false);
  const [openStatusDropbox, setOpenStatusDropbox] = useState(false);
  const [detail, setDetail] = useState(false);
  const [selectItem, setSelectItem] = useState({
    vacation:'선택하세요',
    status:'선택하세요'
  });

  const onClickDetail = () => {
    setDetail(true);
  };

  const onClickType = () => {
    setOpenDropbox(!openDropbox);
  };

  const onClickStatus = () => {
    setOpenStatusDropbox(!openStatusDropbox);
  };

  const onClickDropBoxItem = (e, target) => {
    setSelectItem({...selectItem, [target]: e.target.id});

    if(target === 'vacation') {
      onClickType();
    }else{
      onClickStatus();
    }
  };

  useEffect(() => {
    console.log(selectItem);
  }, [selectItem]);




  return (
    <Wrapper>
      <TitleContainer/>

      <Container>
        <ListContainer>
          <HeaderContainer>
            <InnerLayout>사원번호</InnerLayout>
            <InnerLayout>사원명</InnerLayout>
            <InnerLayout>휴가 신청일</InnerLayout>
            <InnerLayout>휴가 종류</InnerLayout>
            <InnerLayout>신청 사유</InnerLayout>
            <InnerLayout>상태</InnerLayout>
            <InnerLayout>세부 사항</InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><InputComponent type={'date'}/></InnerLayout>
            <InnerLayout><Dropbox id={'vacation'} open={openDropbox} onClickDropBox={onClickType} menu={VACATION_TYPE} select={selectItem.vacation} onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'vacation')}/></InnerLayout>
            <InnerLayout><InputComponent type={'text'}/></InnerLayout>
            <InnerLayout><Dropbox id={'status'} open={openStatusDropbox} onClickDropBox={onClickStatus} menu={APPROVAL_TYPE} select={selectItem.status} onClickDropBoxItem={(e) => onClickDropBoxItem(e, 'status')}/></InnerLayout>
            <InnerLayout>-</InnerLayout>
          </HeaderContainer>

          <ListItemComponent onClickDetail={onClickDetail}/>
          <ListItemComponent onClickDetail={onClickDetail}/>
          <ListItemComponent onClickDetail={onClickDetail}/>
          <ListItemComponent onClickDetail={onClickDetail}/>
        </ListContainer>

        <SideContainer>
          <InfoContainer h={35}/>
          <InfoContainer h={63}>
            <UserInfoComponent detail={detail}/>
          </InfoContainer>
        </SideContainer>
      </Container>

    </Wrapper>
  );
};

const {
  Wrapper,
  TitleContainer,

  Container,
  SideContainer,
  InfoContainer,
  ListContainer,

  HeaderContainer,
  InnerLayout,
  SearchContainer,
  SearchInput,

  ListItemContainer,
  ItemContainer,
  BtnContainer,

  UserInfoContainer,
  InnerInfoContainer,
  InnerInfoItem,
  InfoInputContainer,
  StoreBtn,
} = style;

InputComponent.propTypes = {
  type:PropTypes.string.isRequired,
};

ListItemComponent.propTypes = {
  onClickDetail:PropTypes.func.isRequired,
};

UserInfoComponent.propTypes = {
  detail:PropTypes.bool.isRequired,
};