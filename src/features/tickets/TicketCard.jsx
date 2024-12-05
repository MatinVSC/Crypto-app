import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TicketCardStyled = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const TicketInfo = styled.div`
  margin-bottom: 15px;
`;

const TicketText = styled.p`
  margin: 5px 0;
  font-size: 1.25rem;
  color: #666;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #007bff, #00d4ff);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(90deg, #0056b3, #008fb3);
  }
`;


export default function TicketCard({ ticket }) {
  const navigate = useNavigate();
  const { open, timestamp, subject, topic, id: ticketId } = ticket;
  const status = open === true ? 'is open' : 'is close';

  const dateTransaction = timestamp / 1000000;
  const ticketTime = new Date(dateTransaction).toLocaleDateString();

  return (
    <TicketCardStyled>
      <TicketInfo>
        <p><strong>Subject :</strong> {subject}</p>
        <TicketText><strong>Topic :</strong> {topic}</TicketText>
        <TicketText><strong>Status :</strong> {status}</TicketText>
        <TicketText><strong>Timestamp :</strong> {ticketTime}</TicketText>
      </TicketInfo>
      <Button onClick={() => navigate(`/getTicket/${ticketId}`)}>View Details</Button>
    </TicketCardStyled>
  )
};