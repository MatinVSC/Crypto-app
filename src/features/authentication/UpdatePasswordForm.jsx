import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateUser } from './useUpdateUser';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import { useUserData } from '../dashboard/useUserData';

function UpdatePasswordForm() {
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
        label="Current Password"
        error={errors?.currentPassword?.message}
      >
        <Input
          type="text"
          id="currentPassword"
          disabled={isUpdating}
          {...register("currentPassword", {
            required: "Current Password is required",
            validate: (value) =>
              value === userPassword || "Password does not match",
          })}
        />
      </FormRow>

      <FormRow
        label="New password (min 8 characters)"
        error={errors?.newPassword?.message}
      >
        <Input
          type="text"
          id="newPassword"
          disabled={isUpdating}
          {...register("newPassword", {
            required: "This field is required",
            validate: (value) =>
              getValues().currentPassword !== value || "The password must be changed",
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {!isUpdating ? "Update password" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
