import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 60px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 30px;
    margin: 20px;
  }
`;

const Header = styled.h1`
  text-align: center;
  color: #0078d7;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 20px 30px;
  background: linear-gradient(90deg, #e3f2fd, #f8f9fa);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LinkText = styled.input`
  flex: 1;
  font-size: 1.8rem;
  font-weight: 500;
  color: #333333;
  border: none;
  background: none;
  outline: none;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 15px;
    width: 100%;
  }
`;

const CopyButton = styled.button`
  padding: 12px 25px;
  font-size: 1.6rem;
  color: #ffffff;
  background: linear-gradient(45deg, #007bff, #0056b3);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(45deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.4rem;
  }
`;

const CountsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
  padding: 40px;
  background: linear-gradient(135deg, #ffffff, #f9fbfd);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;

const CountBox = styled.div`
  flex: 1;
  text-align: center;
  padding: 30px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const CountNumber = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: #0078d7;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const CountLabel = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: #555555;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Partnership = ({ firstPartners, secondPartners, userId }) => {
  const { t } = useTranslation();
  const referralLink = `http://localhost:5173/register/${userId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success(t('toast.copy', "Link copied to clipboard !"));
  };

  return (
    <Container>
      <Header>{t('partner.partnership', 'Partnership Dashboard')}</Header>

      <Wrapper>
        <LinkText type="text" value={referralLink} readOnly />
        <CopyButton onClick={copyToClipboard}>{t('partner.copy', 'Copy Invite Link')}</CopyButton>
      </Wrapper>

      <CountsWrapper>
        <CountBox>
          <CountNumber>{firstPartners.length}</CountNumber>
          <CountLabel>{t('partner.levelone', 'Level 1 Invites')}</CountLabel>
        </CountBox>
        <CountBox>
          <CountNumber>{secondPartners.length}</CountNumber>
          <CountLabel>{t('partner.leveltwo', 'Level 2 Invites')}</CountLabel>
        </CountBox>
      </CountsWrapper>
    </Container>
  );
};

export default Partnership;
