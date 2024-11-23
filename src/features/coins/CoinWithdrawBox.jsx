import styled from 'styled-components';
// import { format } from 'date-fns';


// import { formatDistanceFromNow } from 'utils/helpers';
// import { isToday } from 'date-fns/esm';
// import { formatCurrency } from 'utils/helpers';
import {
  // HiOutlineChatBubbleBottomCenterText,
  // HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import DataItem from '../../ui/DataItem';
import { useParams } from 'react-router-dom';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useQuery } from 'react-query';
import { useWithdrawCoin } from './useWithdrawCoin';
// import { Flag } from 'ui/Flag';

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  /* padding: 2.4rem 4rem; */
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
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-900);
  
  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-900);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
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
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function CoinWithdrawBox() {
  const { coinId } = useParams();
  const { register: withderawForm, formState: { errors }, handleSubmit } = useForm();
  const { withdrawCoin, isLoading } = useWithdrawCoin();
  const { data } = useQuery(['walletWithdraw'], {
    enabled: false
  });

  function onSubmit({ value, walletAddress }) {
    console.log({ value, walletAddress });


    value = Number(value)

    if (!value || !coinId) return
    withdrawCoin({ value, coinId, walletAddress }, {
      onSettled: () => console.log("inja navigate mikonim")
    })
  };

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            Form use Withderaw Value<span>(USDT)</span>
          </p>
        </div>

      </Header>

      <Section>

        <Guest>
          <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
            <FormRowVertical label="value USDT" error={errors?.value?.message}>
              <Input
                type="number"
                id="value"
                {...withderawForm('value',
                  {
                    require: 'This field is required',
                    pattern: {
                      value: /^\d+$/,
                      message: 'Please provide a valid number address'
                    },
                    min: {
                      value: 50,
                      message: "minimum withderaw value is 50 USD. you should withderaw more."
                    }
                  }
                )}
                // This makes this form better for password managers
                autoComplete="value"
                disabled={isLoading}
              />
            </FormRowVertical>
            <FormRowVertical label="Wallet Address" error={errors?.walletAddress?.message}>
              <Input
                type="text"
                id="walletAddress"
                {...withderawForm('walletAddress',
                  {
                    require: 'This field is required',
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: 'Please provide a valid address BEP20!'
                    },
                    min: {
                      value: 40,
                      message: "Please provide a valid address BEP20."
                    }
                  }
                )}
                // This makes this form better for password managers
                autoComplete="walletAddress"
                disabled={isLoading}
              />
            </FormRowVertical>
            <FormRowVertical>
              <Button
                size="large"
                disabled={isLoading}
              >
                {!isLoading ? 'WITHDRAW' : <SpinnerMini />}
              </Button>
            </FormRowVertical>
          </Form>
        </Guest>
      </Section>

      <Price isPaid={"empty"}>
        <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
          <p>empty</p>
        </DataItem>

        {/* <p>{isPaid ? 'Paid' : 'Will pay at property'}</p> */}
      </Price>
      <Footer>
        <p>Booked</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default CoinWithdrawBox;
