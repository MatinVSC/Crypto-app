import { useQuery } from 'react-query';
import { useWithdrawCoin } from './useWithdrawCoin';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineCurrencyDollar, HiOutlineHomeModern } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DataItem from '../../ui/DataItem';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.6rem;
  }
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.2rem;
    font-size: 1.6rem;
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  width: 100%;
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-900);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-900);
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media (max-width: 768px) {
    gap: 1.2rem;
    padding: 1.2rem 2rem;
  }
`;

function CoinWithdrawBox({ coinName, coinId }) {
  const { t } = useTranslation();
  const { register: withderawForm, formState: { errors }, handleSubmit, watch, setValue } = useForm();
  const { withdrawCoin, isLoading } = useWithdrawCoin();
  const { data: transactionId } = useQuery(["walletWithdraw"], {
    enabled: false
  });
  const navigate = useNavigate();
  const { price } = useLocation().state || {};

  const valueInput = watch('value');

  useEffect(() => {
    if (valueInput) {
      const coinDepositValue = (+valueInput / +price).toFixed(2);
      setValue('coinDepositValue', coinDepositValue);
    }
  }, [valueInput, setValue, price]);

  function onSubmit({ value, walletAddress }) {
    value = Number(value);

    if (!value || !coinId || !walletAddress) return;
    withdrawCoin({ value, coinId, walletAddress });
  }

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {t('coins.withdrawForm', { coinName, defaultValue: `Form use deposit value ${coinName}` })}
          </p>
        </div>
      </Header>

      <Section>
        <Guest>
          <Form type="form" onSubmit={handleSubmit(onSubmit)}>
            <FormRowVertical label={t('coins.value', 'Value USDT')} error={errors?.value?.message}>
              <Input
                type="number"
                id="value"
                {...withderawForm('value', {
                  required: t('errors.require', 'This field is required'),
                  pattern: {
                    value: /^\d+$/,
                    message: t('errors.number', 'Please enter a number')
                  },
                  min: {
                    value: 50,
                    message: t('errors.withdraw', "The minimum withdraw amount is 50 USD")
                  }
                })}
                autoComplete="value"
                disabled={isLoading}
              />
            </FormRowVertical>
            <FormRowVertical label={t('coins.walletAddress', 'Wallet Address')} error={errors?.walletAddress?.message}>
              <Input
                type="text"
                id="walletAddress"
                {...withderawForm('walletAddress', {
                  required: t('errors.require', 'This field is required'),
                  minLength: {
                    value: 26,
                    message: t('errors.address', 'Please provide a valid address')
                  }
                })}
                autoComplete="walletAddress"
                disabled={isLoading}
              />
            </FormRowVertical>

            <FormRowVertical label={t('coins.withdrawBox', { coinName, defaultValue: `Withdraw amount is equal to : ${coinName}` })}>
              <Input
                type="number"
                id="coinDepositValue"
                disabled={isLoading}
                {...withderawForm('coinDepositValue')}
                readOnly
              />
            </FormRowVertical>

            <FormRowVertical>
              <Button size="large" disabled={isLoading}>
                {!isLoading ? t('coins.withdraw', 'Withdraw') : <SpinnerMini />}
              </Button>
            </FormRowVertical>
          </Form>
        </Guest>

        {transactionId ? (
          <Guest>
            <Price isPaid={true}>
              <DataItem icon={<HiOutlineCurrencyDollar />} label={t('coins.withdrawSucc', 'Your Withdraw was Successfully')}>
              </DataItem>
              <p>{t('coins.transactionId', { transactionId, defaultValue: `Transaction id : ${transactionId}` })}</p>
            </Price>
            <Button onClick={() => navigate('/gett')}>
              {t('coins.seeTransactions', 'see Transactions')}
            </Button>
          </Guest>
        ) : (
          <Guest>
            <div>
              <p>{t('coins.withdrawValue', 'Please set your withdraw values !')}</p>
            </div>
          </Guest>
        )}
      </Section>
    </StyledBookingDataBox>
  );
}

export default CoinWithdrawBox;
