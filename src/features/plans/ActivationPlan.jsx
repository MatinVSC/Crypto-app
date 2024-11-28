import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import { useActivationPlan } from './useActivationPlan';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

// We use react-hook-form to make working with complex and REAL-WORLD forms a lot easier. It handles stuff like user validation and errors. manages the form state for us, etc
// Validating the user’s data passed through the form is a crucial responsibility for a developer.
// React Hook Form takes a slightly different approach than other form libraries in the React ecosystem by adopting the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.

// Receives closeModal directly from Modal
function ActivationPlan({ onCloseModal, planId, planName, isSpecial, percentage }) {
  const { activationPlan, isLoading } = useActivationPlan();

  // One of the key concepts in React Hook Form is to register your component into the hook. This will make its value available for both the form validation and submission.
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
  // Invoked when validation fails
  const onError = function (errors) {
    toast.error('Failed validation', errors)
  };

  // By default, validation happens the moment we submit the form, so when we call handleSubmit. From them on, validation happens on the onChange event [demonstrate]. We cah change that by passing options into useForm ('mode' and 'reValidateMode')
  // https://react-hook-form.com/api/useform

  // The registered names need to be the same as in the Supabase table. This makes it easier to send the request
  // "handleSubmit" will validate your inputs before invoking "onSubmit"

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Your chosen plan :">
        <span>{planName}</span>
      </FormRow>

      <FormRow label='Your deposit amount :'
        error={errors?.value?.message}>
        <Input
          type="number"
          id="value"
          disabled={isLoading}
          {...register('value',
            {
              require: 'This field is required',
              pattern: {
                value: /^\d+$/,
                message: 'Please provide a valid number'
              },
              min: {
                value: isSpecial ? 150 : 100,
                message: isSpecial ? "minimum deposit value 150 USDT" : "minimum deposit value 100 USDT"
              }
            }
          )} />
      </FormRow>

      <FormRow label="Interest on your deposit in 30 days :"
        error={errors?.userInterest?.message}>
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
          Cancel
        </Button>
        <Button disabled={isLoading}>
          Plan activation
        </Button>
      </FormRow>
    </Form>
  );
}

export default ActivationPlan;
