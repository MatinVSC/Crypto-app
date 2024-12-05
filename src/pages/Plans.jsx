import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PlansTable from "../features/plans/PlansTable";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { usePlans } from "../features/plans/usePlans";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

function Plans() {
  const { plansData, isLoading } = usePlans();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!plansData) return <Empty resource={'plans'} />;

  const { data: plans } = plansData;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Plans</Heading>
        <Button onClick={() => navigate('/plans/geti', { state: plans })}>
          Activity Plans
        </Button>
      </Row>

      {/* <Row type="horizontal"> */}
      <PlansTable plans={plans} />
      {/* </Row> */}

    </>
  );
}

export default Plans;
