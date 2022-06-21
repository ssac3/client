import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 70px;
  padding: 0px 24px;
  background-color: white;
  ${({theme}) => theme.flexSet('space-between')};
  
`;

const IconLayout = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 120px;
  height: 100%;
  color:${({theme}) => theme.colorSet.SECONDARY.GRAY_79}
  
`;

const SettingLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 50%;
  height: 100%;
  cursor: pointer;
`;

const SignOutLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: 50%;
  height: 100%;
  cursor: pointer;
`;

export const style = {
  Container,
  IconLayout,
  SettingLayout,
  SignOutLayout
};