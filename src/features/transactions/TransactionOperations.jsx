import { useTranslation } from 'react-i18next';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function TransactionOperations() {
    const { t } = useTranslation();

    return (
        <TableOperations>
            <Filter
                filterField={'status'}
                options={[
                    { value: 'deposit', label: t('filter.depositT', 'Deposit Transactions') },
                    { value: 'withdraw', label: t('filter.withdrawT', 'Deposit Transactions') },
                ]}
            />
        </TableOperations>
    );
}

export default TransactionOperations;
