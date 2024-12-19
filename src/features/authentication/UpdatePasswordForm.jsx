import { useForm } from 'react-hook-form';
import { useUserData } from '../dashboard/useUserData';
import { useUpdateUser } from './useUpdateUser';
import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';

function UpdatePasswordForm() {
  const { t } = useTranslation();
  const { userData, isLoading } = useUserData();
  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();

  if (isLoading) return <Spinner />;
  const { password: userPassword } = userData;

  function onSubmit({ currentPassword, newPassword }) {
    if (!currentPassword || !newPassword) return;

    updateUser({ currentPassword, newPassword }, {
      onSuccess: () => reset()
    });
  }

  return (
    <Form type="blue" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label={t('account.password', "Current Password")}
        error={errors?.currentPassword?.message}
      >
        <Input
          type="text"
          id="currentPassword"
          disabled={isUpdating}
          {...register("currentPassword", {
            required: t('errors.passwordRequire', "current Password is required"),
            validate: (value) =>
              value === userPassword || t('errors.currentPassword', "Password does not match"),
          })}
        />
      </FormRow>

      <FormRow
        label={t('account.newPassword', "New password (min 8 characters)")}
        error={errors?.newPassword?.message}
      >
        <Input
          type="text"
          id="newPassword"
          disabled={isUpdating}
          {...register("newPassword", {
            required: t('errors.require', 'This field is required'),
            validate: (value) =>
              getValues().currentPassword !== value || t('errors.changePassword', "The password must be changed"),
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          {t('cancel', 'Cancel')}
        </Button>
        <Button disabled={isUpdating}>
          {!isUpdating ? t('account.updatePassword', 'Update Password') : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
