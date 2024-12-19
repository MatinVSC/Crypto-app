import styled, { keyframes } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const slideIn = keyframes`
  from {
    left: -100%;
  }
  to {
    left: 0;
  }
`;

const slideOut = keyframes`
  from {
    left: 0;
  }
  to {
    left: -100%;
  }
`;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  
  @media (max-width: 768px) {
    position: absolute;
    width: 40%;
    height: 100%;
    top: 0;
    left: ${(props) => (props.openSidebar ? "0" : "-100%")};
    animation: ${(props) => (props.openSidebar ? slideIn : slideOut)} 0.3s forwards;
    z-index: 10;
    background-color: orange;
  }
`;

function Sidebar({ openSidebar, toggleSidebar }) {
  return (
    <StyledSidebar openSidebar={openSidebar}>
      <Logo />
      <MainNav toggleSidebar={toggleSidebar} />
    </StyledSidebar>
  );
}

export default Sidebar;
