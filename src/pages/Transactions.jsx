import BookingTableOperations from '../features/coins/CoinsTableOperations';
import TransactionOperations from '../features/transactions/TransactionOperations';
import TransactionsTable from '../features/transactions/TransactionsTable';
import { useTransactionsUser } from '../features/transactions/useTransactionsUser';
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from '../ui/Spinner';

function Transactions() {
  const { transactionUser, isLoading } = useTransactionsUser();

  if (isLoading) return <Spinner />

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>
        <TransactionOperations
          transactionUser={transactionUser}
        />
      </Row>

      <TransactionsTable
        transactionUser={transactionUser}
        isLoading={isLoading}
      />
    </>
  );
}

export default Transactions;
