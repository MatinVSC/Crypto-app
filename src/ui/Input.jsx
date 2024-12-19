import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 1.2rem;
  }
`;

export default Input;
