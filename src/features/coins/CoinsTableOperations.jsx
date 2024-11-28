import FilterCoins from '../../ui/FilterCoins';
import TableOperations from '../../ui/TableOperations';

function CoinsTableOperations({ transactionUser }) {
  return (
    <TableOperations>
      {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
      <FilterCoins
        transactionUser={transactionUser}
        filterField={'status'}
        options={[
          { value: 'all', label: 'All' },
          { value: 'history/t', label: 'Deposit History' },
          { value: 'history/w', label: 'Withdraw History' },
          { value: 'plans', label: 'Activity Plans' },
        ]}
      />
    </TableOperations>
  );
}

export default CoinsTableOperations;
