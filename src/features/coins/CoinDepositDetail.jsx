// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import Spinner from 'ui/Spinner';
import CoinDepositBox from './CoinDepositBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
// import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
// import Modal from '../../ui/Modal';
// import ConfirmDelete from '../../ui/ConfirmDelete';

// import { useBooking } from 'features/bookings/useBooking';
// import { useDeleteBooking } from './useDeleteBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useParams } from 'react-router-dom';

// import { useCheckout } from 'features/check-in-out/useCheckout';
// import ButtonText from '../../ui/ButtonText';
// import Empty from 'ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function CoinDepositDetail() {

  const moveBack = useMoveBack();

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Deposit Whit USDT</Heading>
        </HeadingGroup>
      </Row>

      <CoinDepositBox />

      <ButtonGroup>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CoinDepositDetail;
