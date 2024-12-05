import TransactionRow from './TransactionRow';
import Table from '../../ui/Table';
// import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import { useCoins } from '../coins/useCoins';
import { useMemo, useState } from 'react';
import Pagination from '../../ui/Pagination';
import { PAGE_SIZE } from '../../utils/constants';


function TransactionsTable({ depositTransaction, withdrawTransaction, statusUrl, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { coinsData, isLoading: isLoadingCoins } = useCoins();
  const currentFild = statusUrl === 'deposit' ? depositTransaction : withdrawTransaction;

  const currentTransactions = useMemo(() => {
    if (!currentFild) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = currentPage * PAGE_SIZE;
    return currentFild.slice(start, end);
  }, [currentPage, currentFild]);


  return (
    <Menus>
      {/* A beautiful API we created here! We could even have defined the widths on the columns in the table header individually, but this keeps it simpler, and I also really like it */}
      <Table columns='1fr 200px 1fr 200px'>
        <Table.Header>
          <div style={{ marginLeft: "4.5rem" }}>Coin</div>
          <div>Value</div>
          <div style={{ marginLeft: "4.5rem" }}>Dates</div>
          <div style={{ marginLeft: "1.5rem" }}>Status</div>
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
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <BookingTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default TransactionsTable;
