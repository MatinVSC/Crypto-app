import { NavLink } from "react-router-dom";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";

import styled from "styled-components";
import RegisterForm from "../features/authentication/RegisterForm";
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const RegisterLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 1.8rem;
  background-color: var(--color-grey-50);
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

function Register() {
    return <RegisterLayout>
        <Logo />
        <Heading as='h4'>
            Register to your account
        </Heading>
        <RegisterForm />
        <NavList>
            <li>
                <StyledNavLink to="/login">
                    <HiArrowLeftEndOnRectangle />
                    <span>Already have an account ?
                        <span style={{ color: "blue" }}>  Log in now</span>
                    </span>
                </StyledNavLink>
            </li>
        </NavList>
    </RegisterLayout>;
}

export default Register;
