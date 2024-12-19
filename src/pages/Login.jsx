import { NavLink } from "react-router-dom";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

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

  @media (max-width: 768px) {
    font-size: 1.4rem;
    gap: 1rem;
    padding: 1rem 1.8rem;
  }
`;

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media (max-width: 768px) {
    grid-template-columns: 90%;
    gap: 2.4rem;
  }
`;

function Login() {
  const { t } = useTranslation();

  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>
        {t('login.header', 'Login to your account')}
      </Heading>
      <LoginForm />
      <NavList>
        <li>
          <StyledNavLink to="/register">
            <span>{t('login.register', 'No account created yet ?')}<span style={{ color: "blue" }}>  {t('login.signup', 'Sign Up')}</span></span>
            <HiArrowLeftEndOnRectangle />
          </StyledNavLink>
        </li>
      </NavList>
    </LoginLayout>
  );
}

export default Login;
