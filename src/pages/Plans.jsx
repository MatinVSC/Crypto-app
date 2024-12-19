import { useNavigate } from "react-router-dom";
import { usePlans } from "../features/plans/usePlans";
import { useMoveBack } from "../hooks/useMoveBack";
import { useTranslation } from "react-i18next";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import PlansTable from "../features/plans/PlansTable";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

function Plans() {
  const { t } = useTranslation();
  const moveBack = useMoveBack();
  const { plansData, isLoading } = usePlans();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!plansData) return <Empty resource={'plans'} />;

  const { data: plans } = plansData;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{t("plans.header", "Plans")}</Heading>
        <Button
          variation="secondary"
          onClick={moveBack}
        >
          {t("back", "Back")}
        </Button>
      </Row>
      <Button onClick={() => navigate('/plans/geti', { state: plans })}>
        {t("plans.activeted", "Activated plans")}
      </Button>

      <PlansTable plans={plans} />
    </>
  );
}

export default Plans;
