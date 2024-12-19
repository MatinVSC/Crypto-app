import { useTranslation } from 'react-i18next';
import { useCoins } from './useCoins';
import { useMoveBack } from '../../hooks/useMoveBack';
import CoinsRow from './CoinsRow';
import CoinsTableOperatioon from './CoinsTableOperations';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';
import styled from 'styled-components';

const TableName = styled.div`
  margin-left: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function CoinsTable({ userBalance }) {
  const { t } = useTranslation();
  const moveBack = useMoveBack();
  const { coinsData = [], isLoading } = useCoins();

  if (isLoading) return <Spinner />;
  if (!coinsData) return <Empty resource={'coins'} />;

  const { data: coin } = coinsData;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{t('coins.header', 'Total Asset Value : $')}{userBalance}</Heading>
        <Button variation="dsecondary" onClick={moveBack}>{t('back', 'Back')}</Button>
      </Row>
      <CoinsTableOperatioon />

      <Menus>
        <Table columns='1fr 1fr 1fr 1fr 1fr'>
          <Table.Header>
            <TableName>{t('coins.coin', 'Coin')}</TableName>
            <TableName>{t('coins.name', 'Name')}</TableName>
            <TableName>{t('coins.price', 'Price')}</TableName>
            <TableName>{t('coins.change', 'Change')}</TableName>
            <TableName>{t('coins.transaction', 'Transaction')}</TableName>
          </Table.Header>

          {coin && coin.map((coin) => (
            <CoinsRow key={coin.id} coin={coin} />
          ))}
        </Table>
      </Menus>
    </>
  );
}

export default CoinsTable;
