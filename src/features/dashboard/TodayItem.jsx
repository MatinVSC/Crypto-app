import { Link } from 'react-router-dom';
import { Flag } from '../../ui/Flag';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Tag from '../../ui/Tag';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ transaction }) {
  const { t } = useTranslation();
  const { code, icon, status, value } = transaction;

  return (
    <StyledTodayItem>
      {status === 1 && <Tag type='green'>{t('transaction.success', 'Success')}</Tag>}
      {status === 0 && <Tag type='blue'>{t('transaction.pending', 'Pending')}</Tag>}
      {status === -1 && <Tag type='red'>{t('transaction.failed', 'Failded')}</Tag>}

      <Flag
        src={icon}
        alt={`Flag on ${code}`}
      >
      </Flag>

      <Guest>{code}</Guest>
      <div>${value}</div>

      <Button
        size='small'
        variation='primary'
        as={Link}
        to={`/gett`}
      >
        {t('transaction.details', 'Details')}
      </Button>

    </StyledTodayItem>
  );
}

export default TodayItem;
