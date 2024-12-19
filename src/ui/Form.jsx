import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 768px) {
        padding: 1.2rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "form" &&
    css`
      width: 80%;

      @media (max-width: 768px) {
        width: 100%;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 70rem;

      @media (max-width: 768px) {
        width: 100%;
      }
    `}
    
  ${(props) =>
    props.type === "blue" &&
    css`
      padding: 2.4rem 4rem;
      background-color: #f0f8ff;
      border: 2px solid #007bff;
      border-radius: var(--border-radius-md);
      box-shadow: 0 4px 10px rgba(0, 123, 255, 0.1);

      @media (max-width: 768px) {
        padding: 1.2rem 2rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
