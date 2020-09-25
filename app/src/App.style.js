import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #282c34;
  width: 100%;
  height: 100vh;
  padding-top: 3rem;
  padding-bottom: 3rem;
  overflow: hidden;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #d9d9d9;
  padding-top: 2.5rem;

  & > * + * {
    margin-left: 0.5rem;
  }
`;
