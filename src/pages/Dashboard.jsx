import { useTranslation } from "react-i18next";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from '../features/dashboard/DashboardLayout';

function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{t('dashboard.header', 'Dashboard')}</Heading>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
