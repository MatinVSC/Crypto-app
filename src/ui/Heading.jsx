import styled, { css } from "styled-components";

const Heading = styled.h2`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 2.2rem;
      }
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 1.8rem;
      }
    `}
    
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;

      @media (max-width: 768px) {
        font-size: 2.2rem;
      }
    `}
    
  line-height: 1.4;

  @media (max-width: 768px) {
    line-height: 1.2;
  }
`;

export default Heading;
