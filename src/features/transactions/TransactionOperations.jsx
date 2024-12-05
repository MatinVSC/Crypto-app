// import { useState } from 'react';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

// { depositTransaction, withdrawTransaction }

function TransactionOperations() {

    return (
        <TableOperations>
            {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
            <Filter
                filterField={'status'}
                options={[
                    { value: 'deposit', label: 'Deposit Transactions' },
                    { value: 'withdraw', label: 'withdraw Transactions' },
                ]}
            />
        </TableOperations>
    );
}

export default TransactionOperations;
