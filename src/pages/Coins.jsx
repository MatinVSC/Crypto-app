import CoinsTable from '../features/coins/CoinsTable';
import { useUserData } from '../features/dashboard/useUserData';
import Spinner from '../ui/Spinner';

function Coins() {
  const { userData = [], isLoading } = useUserData();

  if (isLoading) return <Spinner />

  const balance = userData.balance

  return (
    <CoinsTable userBalance={balance} />
  );
}

export default Coins;
