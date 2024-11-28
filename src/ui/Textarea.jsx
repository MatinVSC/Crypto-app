import styled from "styled-components";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StyledTextarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 7rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
`;


export default function TextArea({ walletAdress }) {
  const navigate = useNavigate();

  const handelCopyAddress = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(walletAdress)
        toast.success("Copied to clipboard.")
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
      toast.error("Failed to copy address");
      console.error(error);
    }
  }

  return (
    walletAdress ? (
      <Container>
        <h3>Wallet Address USDT(BEP20)</h3>
        <StyledTextarea value={walletAdress} readOnly />
        <Button onClick={handelCopyAddress}>
          Copy Wallet Address
        </Button>
        <Button
         onClick={() => navigate('/gett')}>
          see Transactions
        </Button>
      </Container>
    ) : (
      <div>
        <p>Please set your deposit value</p>
      </div>
    )
  )
}
