import PlansRow from './PlansRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function PlanseTable({ plans }) {

  return (
    <Menus>
      <Table>
        {/* Render props! */}
        <Table.Body
          data={plans}
          render={(plans) => <PlansRow key={plans.id} plans={plans} />}
        />
      </Table>
    </Menus>
  );
}

export default PlanseTable;
