import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #000000;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: none;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  padding-top: 2.5rem;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

export const Subtitle = styled.div`
  font-size: 1.25rem;
  color: gray;
`;
