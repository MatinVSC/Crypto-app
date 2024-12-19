import styled from "styled-components";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledTextarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 7rem;

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 1.4rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.8rem;
  }
`;

export default function TextArea({ walletAdress, coinName }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handelCopyAddress = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(walletAdress);
        toast.success(t('toast.copy', "Link copied to clipboard !"));
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = walletAdress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success("Copied to clipboard.");
      }
    } catch (error) {
      toast.error(t('toast.copy', "Link copied to clipboard !"));
      console.error(error);
    }
  };

  return (
    walletAdress ? (
      <Container>
        <h3>{t('coins.depositWallet', { coinName, defaultValue: `Deposit wallet Address ${coinName}` })}</h3>
        <StyledTextarea value={walletAdress} readOnly />
        <Button onClick={handelCopyAddress}>
          {t('coins.copy', 'Copy wallet address')}
        </Button>
        <Button onClick={() => navigate('/gett')}>
          {t('coins.see', 'See Transactions')}
        </Button>
      </Container>
    ) : (
      <div>
        <p>{t('coins.depositText', 'Please set your deposit value !')}</p>
      </div>
    )
  );
}
