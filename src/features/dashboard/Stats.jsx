import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { useTranslation } from 'react-i18next';

function Stats({ unrealizedProfit, realizedProfit, userBalance, count }) {
  const { t } = useTranslation();

  return (
    <>
      <Stat
        icon={<HiOutlineCalendarDays />}
        title={t('dashboard.realized', 'Realized PNL')}
        value={`$${realizedProfit.toFixed(2)}`}
        color='indigo'
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title={t('dashboard.unrealized', 'Unrealized PNL')}
        value={`$${unrealizedProfit.toFixed(2)}`}
        color='yellow'
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title={t('dashboard.balance', 'Balance')}
        value={`$${userBalance}`}
        color='green'
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        title={t('dashboard.transactions', 'Transactions')}
        value={count}
        color='blue'
      />
    </>
  );
};

export default Stats;
