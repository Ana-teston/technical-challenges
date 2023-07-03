import styled from 'styled-components';

export const Container =  styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ChartCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: solid 1px #282c34;
  margin: 0 0 20px 0; /* Add a bottom margin for the gap */
`;

export const ChartContainer = styled.div`
  width: 300px;
  margin: 10px;
`;

export const ChartTitle = styled.h2`
  margin: 10px;
  justify-content: flex-start;
`;

export const MenuButtonContainer = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 50%;
`;

export const MenuIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;
