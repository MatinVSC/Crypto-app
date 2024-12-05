import styled from "styled-components";

const EmptyStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;


function Empty({ resource }) {
  return <EmptyStyled>There are no {resource}</EmptyStyled>;
}

export default Empty;
