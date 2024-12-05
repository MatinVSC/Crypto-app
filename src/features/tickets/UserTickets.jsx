import React, { useState } from 'react';
import styled from 'styled-components';
import TicketCard from './TicketCard';
import { useUserTickets } from './useUserTickets';
import Spinner from '../../ui/Spinner';
import TicketForm from './TicketForm';
import TicketDetail from './TicketDetail';
import Row from '../../ui/Row';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import Empty from '../../ui/Empty';

const PageContainer = styled.div`
  background-color: #f9fbfd;
  min-height: 100vh;
  padding: o 20px;
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

const TicketList = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const SectionTitle = styled.h3`
  color: #007bff;
  font-size: 1.8rem;
  text-align: center;
  margin: auto 0;
`;

// Main Component
const UserTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { userTickets, isLoading } = useUserTickets();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!userTickets.data) return (
    <>
    <Row type='horizontal'>
      <SectionTitle>Your Tickets</SectionTitle>
      <Button onClick={() => navigate('/newTicket')} >New Ticket</Button>
    </Row>
      <Empty resource={"Tickets"}/>
    </>
  );

  const { data: userTicket } = userTickets

  return (
    <>
      <Row type='horizontal'>
        <SectionTitle>Your Tickets</SectionTitle>
        <Button onClick={() => navigate('/newTicket')} >New Ticket</Button>
      </Row>

      <PageContainer>


        <TicketList>
          {userTicket?.map((ticket) => (
            <TicketCard key={ticket.id}
              ticket={ticket}
              onSelectedTicket={setSelectedTicket}
            />
          ))}
        </TicketList>

        {/* {selectedTicket && (
          <TicketDetail selectedTicket={selectedTicket} />
        )} */}

      </PageContainer>
    </>
  );
};

export default UserTickets;
