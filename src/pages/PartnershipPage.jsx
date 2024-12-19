import { useQuery } from "react-query";
import { useFirstPartners } from "../features/partnership/useFirstPartners";
import { useSecondPartners } from "../features/partnership/useSecondPartners";
import { useTranslation } from "react-i18next";
import { useMoveBack } from "../hooks/useMoveBack";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Partnership from "../features/partnership/partnership";


export default function PartnershipPage() {
  const { t } = useTranslation();
  const { firstPartners, isLoading } = useFirstPartners();
  const { secondPartners, isLoading: isLoadingSecond } = useSecondPartners();
  const { data: userData } = useQuery(['user']);
  const moveBack = useMoveBack();

  if (isLoading || isLoadingSecond) return <Spinner />;

  const { data: firstData } = firstPartners;
  const { data: secondData } = secondPartners;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{t('partner.header')}</Heading>
        <Button
          variation="secondary"
          onClick={moveBack}
        >
          {t("back", "Back")}
        </Button>

      </Row>
      <Partnership
        firstPartners={firstData}
        secondPartners={secondData}
        userId={userData?.id}
      />
    </>
  );
};