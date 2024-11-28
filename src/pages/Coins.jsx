import CoinsTable from '../features/coins/CoinsTable';
import { useUserData } from '../features/dashboard/useUserData';
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from '../ui/Spinner';
import CoinsTableOperations from '../features/coins/CoinsTableOperations';

function Coins() {
  const { userData, isLoading } = useUserData();
  if (isLoading) return <Spinner />
  const { balance } = userData;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">Total Asset Value : ${balance}</Heading>
        <CoinsTableOperations />
      </Row>

      <CoinsTable />
    </>
  );
}

export default Coins;
