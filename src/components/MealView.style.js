import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #fff;
`;

export const MealItemCont = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #f2f2f2;

  & + & {
    margin-top: 1.2rem;
  }

  & > * {
    text-align: center;
  }
`;

export const MeealTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0.4rem;
  color: #4db8ff;
`;

export const MealContent = styled.div`
  line-height: 1.5;
  font-size: 1.8rem;
  white-space: pre-wrap;
`;
