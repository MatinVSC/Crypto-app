import { useUserData } from '../dashboard/useUserData';
import { useUpdateUser } from './useUpdateUser';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';



function UpdateUserDataForm() {
  const { t } = useTranslation();
  const { userData, isLoading } = useUserData();
  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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

      <FormRow type="blue" label={t('account.email', 'Email Address')}>
        <Input value={email} disabled />
      </FormRow>

      <FormRow label={t('account.newEmail', 'New Email Address')}
        error={errors?.email?.message}
      >
        <Input
          type='email'
          id='email'
          disabled={isUpdating}
          {...register('email',
            {
              require: t('errors.require', 'This field is required'),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('errors.email', 'Please provide a valid email address')
              }
            }
          )}
        />
      </FormRow>

      <FormRow label={t('account.password', 'Current Password')}
        error={errors?.currentPasswordForm?.message}
      >
        <Input
          type='password'
          id='CurrentPasswordForm'
          disabled={isUpdating}
          {...register("CurrentPasswordForm", {
            required: t('errors.passwordRequire', "current Password is required"),
            validate: (value) =>
              value === userPassword || t('errors.currentPassword', "Password does not match"),
          })}
        />
      </FormRow>

      <FormRow>
        <Button type='reset' variation='secondary'>
          {t('cancel', 'Cancel')}
        </Button>
        <Button disabled={isUpdating}>
          {!isUpdating ? t('account.update', 'Update Account') : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
