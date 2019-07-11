import styled from 'styled-components';

const breakpoint = '680px';

const Image = styled.img`
  height: 450px;
  width: 50%;
  padding: 40px 0 0 0;

  @media screen and (max-width: ${breakpoint}) {
    width: 100%;
    height: 400px;
    padding: 18px;
    margin-bottom: 0;
  }
`;

const FlexContainer = styled.div`
  display: flex;

  @media screen and (max-width: ${breakpoint}) {
    flex-direction: column;
  }
`;

const FlexInner = styled.div`
  display: flex;
  flex-direction: column;

  & .flex-left {
    display: flex;
    padding: 0 0 0 40px;

    & button:first-child {
      margin-right: 40px;
    }

    @media screen and (max-width: ${breakpoint}) {
      justify-content: normal;
      padding: 20px 20px 20px 40px;
    }
  }

  & .flex-right {
    padding: 40px;

    @media screen and (max-width: ${breakpoint}) {
      padding: 0 0 0 40px;
    }
  }
`;

export { Image, FlexContainer, FlexInner };
