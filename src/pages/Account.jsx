import { useTranslation } from "react-i18next";
import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  const { t } = useTranslation();
  const moveBack = useMoveBack();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">{t('account.header', 'Update your Email account')}</Heading>
        <Button variation="secondary"
          onClick={moveBack}
        >
          {t('back', 'Back')}
        </Button>
      </Row>

      <Row type='vertical'>
        <UpdateUserDataForm />
      </Row>

      <Row type='vertical'>
        <Heading as="h3">{t('account.passwordHeadder', 'Update your Password account')}</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
