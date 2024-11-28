import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function TransactionOperations({ transactionUser: { data } }) {

    return (
        <TableOperations>
            {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
            <Filter
                transactionUser={data}
                filterField={'status'}
                options={[
                    { value: 'all', label: 'All' },
                    { value: '1', label: 'Success' },
                    { value: '-1', label: 'Failed' },
                    { value: '0', label: 'Pending' },
                ]}
            />
        </TableOperations>
    );
}

export default TransactionOperations;
