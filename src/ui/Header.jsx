import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/userAvatar";
import { FaBars } from "react-icons/fa"

const StyledHeader = styled.header`
    background-color  : var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: space-between;
`;

const MenuIcon = styled(FaBars)`
  display: none;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
  color: #8585f2;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Container = styled.div`
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;


export default function Header({ toggleSidebar }) {
  return (
    <StyledHeader>
      <UserAvatar />
      <Container>
        <HeaderMenu />
        <MenuIcon onClick={toggleSidebar} />
      </Container>
    </StyledHeader>
  )
};