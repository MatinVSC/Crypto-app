import { useAllTransactions } from '../transactions/useAllTransactions';
import { useUserData } from './useUserData';
import { useCalcPnl } from './useCalcPnl';
import styled from 'styled-components';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import TodayActivity from './TodayActivity';
import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
`;

function DashboardLayout() {
  const { allTransactions, isLoading } = useAllTransactions();
  const { userData = [], isLoadingUser } = useUserData();
  const { totalProfit, realizedProfit, unrealizedProfit, monthlyProfit, dailyProfit, isLoading: isLoadingPnl } = useCalcPnl();

  if (isLoading || isLoadingUser) return <Spinner />;

  const { balance: userBalance } = userData;

  return (
    <StyledDashboardLayout>
      <Stats
        allTransactions={allTransactions}
        realizedProfit={realizedProfit}
        unrealizedProfit={unrealizedProfit}
        count={allTransactions.length}
        userBalance={userBalance}
      />
      <TodayActivity />
      <DurationChart
        totalProfit={totalProfit}
        realizedProfit={realizedProfit}
        unrealizedProfit={unrealizedProfit}
        monthlyProfit={monthlyProfit}
        dailyProfit={dailyProfit}
        isLoadingPnl={isLoadingPnl}
      />
      <SalesChart allTransactions={allTransactions} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
