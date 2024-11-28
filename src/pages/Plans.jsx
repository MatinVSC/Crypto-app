import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PlansTable from "../features/plans/PlansTable";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function Plans() {
  const navigate = useNavigate();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Plans</Heading>
        <Button onClick={() => navigate('/plans/geti')}>
          Activity Plans
        </Button>
      </Row>

      <Row type="horizontal">
        <PlansTable />
      </Row>

    </>
  );
}

export default Plans;
