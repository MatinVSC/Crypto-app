import { useForm } from 'react-hook-form';
import { useActivationPlan } from './useActivationPlan';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import toast from 'react-hot-toast';

function ActivationPlan({ onCloseModal, planId, planName, isSpecial, percentage, term }) {
  const { t } = useTranslation();
  const { activationPlan, isLoading } = useActivationPlan();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();

  const valueInput = watch('value');

  useEffect(() => {
    if (valueInput) {
      const userInterest = (valueInput * percentage) / 100;
      setValue('userInterest', userInterest);
    }
  }, [valueInput, setValue, percentage])


  // Invoked in ALL validation passes. Here we get access to the form data
  function onSubmit({ value }) {
    value = Number(value)

    if (!value) return
    activationPlan({ value, planId }, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      }
    })
  };

  const onError = function (errors) {
    toast.error(t('toast.failed', 'Failed validation'), errors)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label={t('plans.choosing', "Your chosen plan :")}>
        <span>{planName}</span>
      </FormRow>

      <FormRow label={t('plans.deposit', 'Your deposit amount :')}
        error={errors?.value?.message}>
        <Input
          type="number"
          id="value"
          disabled={isLoading}
          {...register('value',
            {
              require: t('errors.require', 'This field is required'),
              pattern: {
                value: /^\d+$/,
                message: t('errors.number', 'Please provide a valid number')
              },
              min: {
                value: isSpecial ? 150 : 100,
                message: isSpecial
                  ? t('isSpecial.yes', "minimum deposit value 150 USDT")
                  : t('isSpecial.no', "minimum deposit value 100 USDT")
              }
            }
          )} />
      </FormRow>

      <FormRow label={t('plans.interestModal', { term }, `Interest on your deposit in ${term} days :`)}
      >
        <Input
          type="number"
          id="userInterest"
          disabled={isLoading}
          {...register('userInterest')}
          readOnly
        />
      </FormRow>

      <FormRow>
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          {t('cancel', 'Cancel')}
        </Button>
        <Button disabled={isLoading}>
          {t('plans.choose', 'Plan Activation')}
        </Button>
      </FormRow>
    </Form>
  );
}

export default ActivationPlan;
