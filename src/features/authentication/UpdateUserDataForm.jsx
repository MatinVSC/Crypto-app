import { useUserData } from '../dashboard/useUserData';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useUpdateUser } from './useUpdateUser';
import { useForm } from 'react-hook-form';
import SpinnerMini from '../../ui/SpinnerMini';


function UpdateUserDataForm() {
  // We don't need the loading state
  const { userData, isLoading } = useUserData();
  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // formState, getValues, reset

  if (isLoading) return <Spinner />

  const { email, password: userPassword } = userData;

  function onSubmit({ email, CurrentPasswordForm: currentPassword }) {

    if (!email || !currentPassword) return;

    updateUser({ email, currentPassword }, {
      onSuccess: () => reset()
    });

  };



  return (
    <Form type="blue" onSubmit={handleSubmit(onSubmit)}>

      <FormRow type="blue" label='Email address'>
        <Input value={email} disabled />
      </FormRow>


      <FormRow label='New Email Address'
        error={errors?.email?.message}
      >
        <Input
          type='email'
          id='email'
          disabled={isUpdating}
          {...register('email',
            {
              require: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address'
              }
            }
          )}
        />
      </FormRow>

      <FormRow label='Current Password'
        error={errors?.currentPasswordForm?.message}
      >
        <Input
          type='password'
          id='CurrentPasswordForm'
          disabled={isUpdating}
          {...register("CurrentPasswordForm", {
            required: "current Password is required",
            validate: (value) =>
              value === userPassword || "Password does not match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {!isUpdating ? 'Update account' : <SpinnerMini />}

        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
