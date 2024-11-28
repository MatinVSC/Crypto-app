import styled from 'styled-components';
import Table from '../../ui/Table';
import React from 'react';
import Tag from '../../ui/Tag';


const Cabin = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-grey-600);
  font-family: 'Sono';
  margin-left: 1rem;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  font-size: 2rem;
  color: green;
`;

const TransactionRow = React.memo(({ transactionData, coins }) => {
  const [{ name }] = coins
  const {
    id: coinId,
    value,
    status,
    timestamp
  } = transactionData;

  const dateTransaction = timestamp / 1000000;
  const timeTransactions = new Date(dateTransaction).toLocaleDateString();

  const statusToTagName = {
    "Pending": "blue",
    "Success": "green",
    "Failed": "red",
  };

  const statusName = status === -1
    ? "Failed"
    : status === 1
      ? "Success"
      : "Pending";

  return (
    <Table.Row role='row'>
      <Cabin>{name}</Cabin>

      <Stacked>
        <Amount>${value}</Amount>
      </Stacked>

      <Stacked>
        <Cabin>{timeTransactions}</Cabin>
      </Stacked>

      <Stacked>
        <Tag type={statusToTagName[statusName]}>{statusName}</Tag>
      </Stacked>

    </Table.Row>
  );
})

export default TransactionRow;
