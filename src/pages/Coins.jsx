import CoinsTable from '../features/coins/CoinsTable';
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Coins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Coins</Heading>
      </Row>
      <CoinsTable />
    </>
  );
}

export default Coins;
