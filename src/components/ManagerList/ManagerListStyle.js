import styled from 'styled-components';

const ListContainer = styled.div`
  padding: 15px 0px;
  //border-radius: 5px;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  width: 100%;
  margin-bottom: 20px;
`;

const InnerLayout = styled.div`
  ${({theme}) => theme.flexSet()};
  width: calc(100% / 8);
  font-size: 16px;
  font-weight: bold;
`;

const ListItemContainer = styled.div`
  ${({theme}) => theme.flexSet('space-around')};
  //border-top: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_BE};
  //border-bottom: 0.5px solid ${({theme}) => theme.colorSet.SECONDARY.GRAY_BE};
  width: 100%;
  min-height: 25px;
  padding: 15px 8px;
  margin: 10px 0px;
  background-color: white;
  border-radius: 8px;
`;

const ItemContainer = styled.div`
  ${({theme}) => theme.flexSet()};
  width: calc(100% / 8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  horiz-align: center;
`;


export const style = {
  ListContainer,
  HeaderContainer,
  InnerLayout,
  ListItemContainer,
  ItemContainer,
};