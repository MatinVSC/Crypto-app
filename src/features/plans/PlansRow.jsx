import styled from 'styled-components';
import { HiPencil, HiTrash, HiSquare2Stack } from 'react-icons/hi2';

import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

// import { formatCurrency } from '../../utils/helpers';
// import { useDeleteCabin } from './useDeleteCabin';
// import { useCreateCabin } from './useCreateCabin';
// import CreateCabinForm from './CreateCabinForm';


const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



function PlansRow({ plans }) {
    const {
        id,
        name,
        min,
        term,
        time,
        // cancelable,
        // percentage,
    } = plans;


    return (

        <Table.Row>
            <Cabin>{name}</Cabin>
            <Price>{min}</Price>
            {time ? (
                <Discount>{time}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
        </Table.Row>
    );
}

export default PlansRow;
