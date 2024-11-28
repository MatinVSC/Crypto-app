import CoinsRow from './CoinsRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import { useCoins } from './useCoins';;
// import Pagination from '../../ui/Pagination';


function CoinsTable() {
  const { coinsData, isLoading } = useCoins();

  if (isLoading) return <Spinner />;
  if (!coinsData) return <Empty resource={'coins'} />;

  const { data: coin } = coinsData

  return (
    <Menus>
      {/* A beautiful API we created here! We could even have defined the widths on the columns in the table header individually, but this keeps it simpler, and I also really like it */}
      <Table columns='1fr 1fr 1fr 1fr'>
        <Table.Header>
          <div>Coin</div>
          <div style={{ marginLeft: "3.5rem" }}>name</div>
          <div>price</div>
          <div style={{ marginLeft: "8rem" }}>transaction</div>
        </Table.Header>

        {coin.map((coin) => (
          <CoinsRow key={coin.id} coin={coin} />
        ))}

        {/* Render props! */}
        {/* <Table.Body
          data={coin}
          render={(coin) => (
            <CoinsRow key={coin.id} coin={coin} />
          )}
        /> */}

        {/* <Table.Footer>
          <Pagination count={} />
        </Table.Footer> */}
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <BookingTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default CoinsTable;
