// import styled from 'styled-components';
import PlansRow from './PlansRow';
// import Spinner from 'ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
// import Empty from 'ui/Empty';
// import { useSearchParams } from 'react-router-dom';
import { usePlans } from './usePlans';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
// import Plans from '../../pages/Plans';
// import { Suspense } from 'react';

// v2
// Right now this is not really reusable... But we will want to use a similar table for guests as well, but with different columns. ALSO, right now we are defining these columns in BOTH the TableHeader and the CabinRow, which is not good at all. Instead, it would be much better to simply pass the columns into the Table, and the table would give access to the columns to both the header and row. So how can we do that? Well we can again use a compound component! We don't HAVE to do it like this, there's a million ways to implement a table, also without CSS Grid, but this is what I chose

// v1
// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function PlanseTable() {
  const { plansData, isLoading } = usePlans();

  if (isLoading) return <Spinner />;
  if (!plansData) return <Empty resource={'plans'} />;

  const { data: plans } = plansData

  return (
    <Menus>
      {/* A beautiful API we created here! We could even have defined the widths on the columns in the table header individually, but this keeps it simpler, and I also really like it */}
      <Table>
        {/* <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header> */}

        {/* {cabins.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))} */}

        {/* Render props! */}
        <Table.Body
          data={plans}
          render={(plans) => <PlansRow key={plans.id} plans={plans} />}
        />
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <CabinTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default PlanseTable;
