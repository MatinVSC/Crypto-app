import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import Tag from '../../ui/Tag';
import Menus from '../../ui/Menus';
// import Modal from '../../ui/Modal';
import Table from '../../ui/Table';

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Cabin = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-grey-600);
  font-family: 'Sono';
  margin-left: 1rem;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

// const Amount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
// `;

const Img = styled.img`
  display: block;
  width: 4.2rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 1rem;
`;

function CoinsRow({
  coin: {
    id : coinId,
    icon,
    name,
    price
  },
}) {

  const navigate = useNavigate();

  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  // const statusToTagName = {
  //   unconfirmed: 'blue',
  //   'checked-in': 'green',
  //   'checked-out': 'silver',
  // };

  return (
    <Table.Row role='row'>
      <Img src={icon} alt={name} />
      <Cabin>{name}</Cabin>

      <Stacked>
      <Cabin>${price}</Cabin>
      </Stacked>

      {/* <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked> */}

      {/* <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag> */}

      {/* <Amount> */}
        {/* {formatCurrency(totalPrice)} */}
        {/* test */}
      {/* </Amount> */}

      {/* VIDEO we could export this into own component... */}
        <Menus.Menu>
          {/* <Menus.Toggle id={id} /> */}
          {/* <Menus.List id={id}> */}
            <Menus.Button color="green"
              onClick={() => navigate(`/coins/deposit/${coinId}`)}
            >
              Deposit
            </Menus.Button>

            <Menus.Button color="red"
              onClick={() => navigate(`/coins/withdraw/${coinId}`)}
            >
              Withdraw
            </Menus.Button>



            {/* <Menus.Button
              // onClick={() => checkout(id)}
              // disabled={isCheckingOut}
              icon={<HiArrowUpOnSquare />}
            >
              Check out
            </Menus.Button> */}


            {/* <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button> */}
            {/* <Menus.Button>Delete</Menus.Button> */}

            {/* Now it gets a bit confusing... */}
            {/* <Menus.Toggle opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Menus.Toggle> */}
          {/* </Menus.List> */}
        </Menus.Menu>

        {/* This needs to be OUTSIDE of the menu, which in no problem. The compound component gives us this flexibility */}
        {/* <Modal.Window name='delete'>
          <ConfirmDelete
            resource='booking'
          // These options will be passed wherever the function gets called, and they determine what happens next
          // onConfirm={(options) => deleteBooking(id, options)}
          // disabled={isDeleting}
          />
        </Modal.Window> */}

      {/* <div>
        <ButtonWithConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/bookings/${bookingId}`}>Details &rarr;</Link>
      </div> */}
    </Table.Row>
  );
}

export default CoinsRow;
