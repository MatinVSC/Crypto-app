import { useTranslation } from 'react-i18next';
import FilterCoins from '../../ui/FilterCoins';
import TableOperations from '../../ui/TableOperations';

function CoinsTableOperations({ transactionUser }) {
  const { t } = useTranslation();

  return (
    <TableOperations>
      {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
      <FilterCoins
        transactionUser={transactionUser}
        filterField={'status'}
        options={[
          { value: 'all', label: t('filter.all', 'All') },
          { value: 'history/t', label: t('filter.deposit', 'Deposit History') },
          { value: 'history/w', label:  t('filter.withdraw', 'Withdraw History') },
          { value: 'plans', label: t('filter.plans', 'Activity Plans') },
        ]}
      />
    </TableOperations>
  );
}

export default CoinsTableOperations;
