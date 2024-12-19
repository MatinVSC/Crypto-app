import {  HiOutlineHomeModern } from 'react-icons/hi2';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDepositCoin } from './useDepositCoin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import TextArea from '../../ui/Textarea';

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
;


function CoinDepositBox({ coinName, coinId }) {
  const { t } = useTranslation();
  const [walletAdress, setWalletAdress] = useState("");
  const { register: depositForm, formState: { errors }, handleSubmit, watch, setValue } = useForm();
  const { depositCoin, isLoading } = useDepositCoin();
  const { data } = useQuery(['walletDeposit'], {
    enabled: false
  });
  const { price } = useLocation().state || {};

  const valueInput = watch('value');

  useEffect(() => {
    if (valueInput) {
      const coinDepositValue = (+valueInput / +price).toFixed(2);
      setValue('coinDepositValue', coinDepositValue);
    }
  }, [valueInput, setValue, price]);

  useEffect(() => {
    if (data) setWalletAdress(data.wallet);
  }, [data]);

  function onSubmit({ value }) {
    value = Number(value);
    if (!value || !coinId) return;
    depositCoin({ value, coinId });
  }

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
           {t('coins.depositForm', { coinName, defaultValue: `Form use deposit value ${coinName}` })}
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
                {...depositForm('value', {
                  require: t('errors.require', 'This field is required'),
                  pattern: {
                    value: /^\d+$/,
                    message: t('errors.number', 'Please enter a number')
                  },
                  min: {
                    value: 50,
                    message: t('errors.deposit', "The minimum deposit amount is 50 USD")
                  }
                })}
                autoComplete="value"
                disabled={isLoading}
              />
            </FormRowVertical>

            <FormRowVertical label={t('coins.depositBox', { coinName }, `Deposit amount is equal to : ${coinName}`)}>
              <Input
                type="number"
                id="coinDepositValue"
                disabled={isLoading}
                {...depositForm('coinDepositValue')}
                readOnly
              />
            </FormRowVertical>

            <FormRowVertical>
              <Button size="large" disabled={isLoading}>
                {!isLoading ? t('coins.deposit', 'Deposit') : <SpinnerMini />}
              </Button>
            </FormRowVertical>
          </Form>
        </Guest>

        <Guest>
          <TextArea walletAdress={walletAdress} coinName={coinName} />
        </Guest>
      </Section>
    </StyledBookingDataBox>
  );
}

export default CoinDepositBox;
