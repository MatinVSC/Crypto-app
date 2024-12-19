import { useTranslation } from "react-i18next";
import { useMoveBack } from "../hooks/useMoveBack";
import UserTickets from "../features/tickets/UserTickets";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function GetTickets() {
  const { t } = useTranslation();
  const moveBack = useMoveBack();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{t('tickets.header', 'Support Tickets')}</Heading>
        <Button variation="secondary"
          onClick={moveBack}
        >
          {t('back', 'Back')}
        </Button>
      </Row>

      <UserTickets />
    </>
  );
}

export default GetTickets;
