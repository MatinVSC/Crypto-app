import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const TicketInfo = styled.div`
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }

  ${({ isRtl }) =>
    isRtl &&
    css`
      text-align: right;
    `}
`;

const TicketText = styled.p`
  margin: 5px 0;
  font-size: 1.25rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
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
  font-family: 'Vazir', sans-serif;

  &:hover {
    background: linear-gradient(90deg, #0056b3, #008fb3);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 1.1rem;
  }
`;

export default function TicketCard({ ticket }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { open, timestamp, subject, topic, id: ticketId } = ticket;

  const status = open
    ? t("tickets.open", "is open")
    : t("tickets.close", "is close");

  const dateTransaction = timestamp / 1000000;
  const ticketTime = new Date(dateTransaction).toLocaleDateString();

  const isRtl = i18n.language === "fa";

  return (
    <TicketCardStyled>
      <TicketInfo isRtl={isRtl}>
        <TicketText>
          <strong>{t("tickets.subject", "Subject :")}</strong> {subject}
        </TicketText>
        <TicketText>
          <strong>{t("tickets.topic", "Topic :")}</strong> {topic}
        </TicketText>
        <TicketText>
          <strong>{t("tickets.status", "Status :")}</strong> {status}
        </TicketText>
        <TicketText>
          <strong>{t("date", "Date :")}</strong> {ticketTime}
        </TicketText>
      </TicketInfo>
      <Button onClick={() => navigate(`/getTicket/${ticketId}`)}>
        {t("tickets.detail", "View Details")}
      </Button>
    </TicketCardStyled>
  );
}
