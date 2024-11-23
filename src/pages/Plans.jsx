import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PlansTable from "../features/plans/PlansTable";

function Plans() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Plans</Heading>
        <p>TEST</p>
      </Row>

      <Row type="horizontal">
        <PlansTable />
      </Row>

    </>
  );
}

export default Plans;
