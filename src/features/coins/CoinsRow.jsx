import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) =>
    props.color === "red" ? "#e74c3c" :
      props.color === "green" ? "#27ae60" :
        "#34495e"};
  font-family: 'Sono', sans-serif;
  margin-left: 1.2rem;
  letter-spacing: 0.03em;

  &:hover {
    color: ${(props) =>
    props.color === "red" ? "#c0392b" :
      props.color === "green" ? "#2ecc71" :
        "#2c3e50"};
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  & span:first-child {
    font-weight: 600;
    color: #2c3e50;
  }

  & span:last-child {
    color: #95a5a6;
    font-size: 1.3rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin-left: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

function CoinsRow({
  coin: {
    id: coinId,
    icon,
    name,
    price,
    change
  },
}) {

  const navigate = useNavigate();
  const {t} = useTranslation();

  const statusChange = change >= 0
    ? "green"
    : change <= 0
      ? "red"
      : null;

  return (
    <Table.Row type="vertical" role='row'>
      <Img src={icon} alt={name} />

      <Stacked>
        <Cabin>{name}</Cabin>
      </Stacked>

      <Stacked>
        <Cabin>${price}</Cabin>
      </Stacked>

      <Stacked>
        <Cabin color={statusChange}>%{change}</Cabin>
      </Stacked>

      <Menus.Menu>
        <Menus.Button color="green"
          onClick={() => navigate(`/coins/deposit/${name}/${coinId}`, { state: { price, name } })}
        >
          {t('coins.deposit', 'Deposit')}
        </Menus.Button>

        <Menus.Button color="red"
          onClick={() => navigate(`/coins/withdraw/${name}/${coinId}`, { state: { price, name } })}
        >
          {t('coins.withdraw', 'Withdraw')}
        </Menus.Button>
      </Menus.Menu>

    </Table.Row>
  );
}

export default CoinsRow;
