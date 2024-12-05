import { useSearchParams } from 'react-router-dom';
import TransactionOperations from '../features/transactions/TransactionOperations';
import TransactionsTable from '../features/transactions/TransactionsTable';
import { useDepositTransactions } from '../features/transactions/useTransactionsUser';
import { useWithdrawTransactions } from '../features/transactions/useWithdrawTransactions';
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from '../ui/Spinner';
import { useEffect } from 'react';

function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { depositTransactions, isLoading } = useDepositTransactions();
  const { withdrawTransactions, isLoading: isLoadingW } = useWithdrawTransactions();

  useEffect(() => {
    if (!searchParams.has('status')) {
      setSearchParams({ status: "deposit" }, { replace: true });
    }
  }, [searchParams, setSearchParams])

  const statusUrl = searchParams.get("status") || "deposit";

  if (isLoading || isLoadingW) return <Spinner />

  const { data: depositTransaction } = depositTransactions;
  const { data: withdrawTransaction } = withdrawTransactions;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Transactions</Heading>
        <TransactionOperations
        />
      </Row>

      <TransactionsTable
        depositTransaction={depositTransaction}
        withdrawTransaction={withdrawTransaction}
        statusUrl={statusUrl}
      />
    </>
  );
}

export default Transactions;
