import styled from 'styled-components';
import CoinDepositBox from './CoinDepositBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1.2rem;
    flex-direction: column;
  }
`;

function CoinDepositDetail() {
  const { t } = useTranslation();
  const { name, coinId } = useParams();
  const moveBack = useMoveBack();

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h2'>
            {t('coins.depositWith', { name, defaultValue : `Deposit With ${name}`})}
          </Heading>
        </HeadingGroup>
        <Button variation='secondary' onClick={moveBack}>
          {t('back', 'Back')}
        </Button>
      </Row>

      <CoinDepositBox coinName={name} coinId={coinId} />
    </>
  );
}

export default CoinDepositDetail;
