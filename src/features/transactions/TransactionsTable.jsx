import { useCoins } from '../coins/useCoins';
import { useMemo, useState } from 'react';
import { PAGE_SIZE } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import TransactionRow from './TransactionRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import styled from 'styled-components';

const TableName = styled.div`
  margin-left: 1rem;
`;


function TransactionsTable({ depositTransaction, withdrawTransaction, statusUrl }) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const { coinsData } = useCoins();
  const currentFild = statusUrl === 'deposit' ? depositTransaction : withdrawTransaction;

  const currentTransactions = useMemo(() => {
    if (!currentFild) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = currentPage * PAGE_SIZE;
    return currentFild.slice(start, end);
  }, [currentPage, currentFild]);


  return (
    <Menus>
      <Table columns='1fr 1fr 1fr 1fr'>
        <Table.Header type="horizontal">
          <TableName>{t('coins.coin', 'Coin')}</TableName>
          <TableName>{t('transaction.value', 'Value')}</TableName>
          <TableName>{t('transaction.date', 'Dates')}</TableName>
          <TableName>{t('transaction.status', 'Status')}</TableName>
        </Table.Header>

        {currentTransactions.map((transactionData) => (
          <TransactionRow
            key={transactionData.id}
            transactionData={transactionData}
            coins={coinsData?.data}
          />
        ))}

        {currentTransactions.length > 0 && (
          <Table.Footer>
            <Pagination count={currentFild?.length || 0}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage} />
          </Table.Footer>
        )}

      </Table>
    </Menus>
  );
};

export default TransactionsTable;
