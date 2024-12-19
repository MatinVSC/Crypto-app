import { useMoveBack } from '../../hooks/useMoveBack';
import { HiArrowLeft } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CoinWithdrawBox from './CoinWithdrawBox'
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1.2rem;
    flex-direction: column;
  }
`;

function CoinWithdrawDetil() {
  const { t } = useTranslation();
  const { name, coinId } = useParams();
  const moveBack = useMoveBack();

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h2'>
            {t('coins.withdrawWith', { name, defaultValue: `Withdraw With ${name}` })}
          </Heading>
        </HeadingGroup>

        <Button variation='secondary' onClick={moveBack}>
          {<HiArrowLeft />} {t('back', 'Back')}
        </Button>
      </Row>

      <CoinWithdrawBox coinName={name} coinId={coinId} />

    </>
  );
}

export default CoinWithdrawDetil;
