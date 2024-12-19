import { useSearchParams } from 'react-router-dom';
import { useDepositTransactions } from '../features/transactions/useTransactionsUser';
import { useWithdrawTransactions } from '../features/transactions/useWithdrawTransactions';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useMoveBack } from '../hooks/useMoveBack';
import TransactionOperations from '../features/transactions/TransactionOperations';
import TransactionsTable from '../features/transactions/TransactionsTable';
import Button from '../ui/Button';
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from '../ui/Spinner';

function Transactions() {
  const { t } = useTranslation();
  const moveBack = useMoveBack();
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
        <Heading as="h2">{t('transaction.header', Transactions)}</Heading>
        <Button variation="dsecondary" onClick={moveBack}>{t('back', 'Back')}</Button>
      </Row>
      <TransactionOperations />

      <TransactionsTable
        depositTransaction={depositTransaction}
        withdrawTransaction={withdrawTransaction}
        statusUrl={statusUrl}
      />
    </>
  );
}

export default Transactions;
