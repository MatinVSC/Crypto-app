import React from 'react';
import styled from 'styled-components';
import TicketCard from './TicketCard';
import { useUserTickets } from './useUserTickets';
import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import Empty from '../../ui/Empty';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
  background-color: #f9fbfd;
  min-height: 100vh;
  padding: 0 20px;
  font-family: 'Poppins', sans-serif;
  color: #333;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const TicketList = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 18rem 18rem;
    gap: 15px;
  }
`;

const SectionTitle = styled.h3`
  color: #007bff;
  font-size: 1.8rem;
  text-align: center;
  margin: auto 0;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

// Main Component
const UserTickets = () => {
  const { t } = useTranslation();
  const { userTickets, isLoading } = useUserTickets();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!userTickets.data) return (
    <>
      <Row type='horizontal'>
        <SectionTitle>{t('tickets.title', 'Your Tickets')}</SectionTitle>
        <Button onClick={() => navigate('/newTicket')}>{t('tickets.new', 'New Ticket')}</Button>
      </Row>
      <Empty resource={"Tickets"} />
    </>
  );

  const { data: userTicket } = userTickets;

  return (
    <>
      <Row type='horizontal'>
        <SectionTitle>{t('tickets.title', 'Your Tickets')}</SectionTitle>
        <Button onClick={() => navigate('/newTicket')}>{t('tickets.new', 'New Ticket')}</Button>
      </Row>

      <PageContainer>
        <TicketList>
          {userTicket?.map((ticket) => (
            <TicketCard key={ticket.id}
              ticket={ticket}
            />
          ))}
        </TicketList>

      </PageContainer>
    </>
  );
};

export default UserTickets;
