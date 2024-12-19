import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Table from '../../ui/Table';
import React from 'react';
import Tag from '../../ui/Tag';

const Cabin = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #2c3e50;
  font-family: 'Sono', sans-serif;
  margin-left: 1.2rem;
  letter-spacing: 0.03em;
  &:hover {
    color: #3498db;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0.8rem;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  & span:first-child {
    font-weight: 600;
    color: #34495e;
  }

  & span:last-child {
    color: #95a5a6;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    gap: 0.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono', sans-serif;
  font-weight: 600;
  font-size: 2.2rem;
  color: #27ae60;
  letter-spacing: 0.02em;
  &:hover {
    color: #2ecc71;
    transform: scale(1.05);
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    margin-left: 1.2rem;
    font-size: 1.5rem;
  }
`;

const DateRow = styled.div`
  font-family: 'Sono', sans-serif;
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: 0.02em;
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TransactionRow = React.memo(({ transactionData, coins }) => {
  const { t } = useTranslation();

  const coinsMap = React.useMemo(
    () => new Map(coins?.map((coin) => [coin.id, coin.name])),
    [coins]
  );

  const { value, status, timestamp, coin } = transactionData;
  const dateTransaction = format(new Date(timestamp / 1000000), "yyyy-MM-dd");

  const statusToTagName = {
    Pending: "blue",
    Success: "green",
    Failed: "red",
  };

  const statusName = status === -1
    ? "Failed"
    : status === 1
      ? "Success"
      : "Pending";

  const translatedStatus = t(`transaction.${statusName.toLowerCase()}`, statusName);

  return (
    <Table.Row type="horizontal" role="row">
      <Stacked>
        <Cabin>{coinsMap.get(coin) || "Unknown Coin"}</Cabin>
      </Stacked>
      <Stacked>
        <Amount>${value}</Amount>
      </Stacked>
      <Stacked>
        <DateRow>{dateTransaction}</DateRow>
      </Stacked>
      <Stacked>
        <Tag type={statusToTagName[statusName]}>{translatedStatus}</Tag>
      </Stacked>
    </Table.Row>
  );
});

export default TransactionRow;
