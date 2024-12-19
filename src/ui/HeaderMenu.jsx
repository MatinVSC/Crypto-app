import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage, MdOutlineNotificationsNone } from "react-icons/md";

import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from '../features/authentication/Logout';
import Modal from "./Modal";
import Notifications from "../features/notifications/Notifications";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: var(--color-white);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;

  ${Dropdown}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.a`
  color: var(--color-gray-600);
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

export default function HeaderMenu() {
  const { i18n } = useTranslation();
  const [isEnglish_, setIsEnglish] = useState(i18n.language === "en");
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    i18n.changeLanguage(savedLang);
    document.documentElement.classList.toggle('rtl', savedLang === 'fa');
    setIsEnglish(savedLang === 'en');
  }, [i18n]);

  const changeLanguage = (lang) => {
    setIsEnglish(lang === 'en');
    i18n.changeLanguage(lang);
    document.documentElement.classList.toggle('rtl', lang === 'fa');
    localStorage.setItem('lang', lang);
  };

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Dropdown>
          <ButtonIcon>
            <MdLanguage />
          </ButtonIcon>
          <DropdownContent>
            <DropdownItem onClick={() => changeLanguage('en')}>English</DropdownItem>
            <DropdownItem onClick={() => changeLanguage('fa')}>فارسی</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </li>
      <li>
        <Modal>
          <Modal.Open opens='notifications'>
            <ButtonIcon>
              <MdOutlineNotificationsNone />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name='notifications'>
            <Notifications />
          </Modal.Window>
        </Modal>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
