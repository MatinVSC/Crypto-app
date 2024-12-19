import { useTransactionsActiviy } from "./useTransactionsActivity";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    padding: 2rem;
  }
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.div`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

function TodayActivity() {
  const { t } = useTranslation();
  const { transactionsActivity, isLoading } = useTransactionsActiviy();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">{t('dashboard.today', 'Today Transactions')}</Heading>
      </Row>

      {!isLoading ?
        transactionsActivity?.length > 0
          ?
          <TodayList>
            {transactionsActivity.slice(0, 10).map(transaction => (
              <TodayItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </TodayList>
          :
          <NoActivity>{t('dashboard.noToday', 'No Transaction today...')}</NoActivity>
        :
        <Spinner />}

    </StyledToday>
  );
}

export default TodayActivity;
