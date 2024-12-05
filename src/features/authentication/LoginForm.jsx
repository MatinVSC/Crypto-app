import { useLogin } from "../authentication/useLogin";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const { register: loginForm, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { login, isLoading } = useLogin();

  function onSubmit({ email, password }) {

    if (!email || !password) return
    login({ email, password }, {
      onSettled: () => reset()
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...loginForm('email',
            {
              require: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address'
              }
            }
          )}
          // This makes this form better for password managers
          autoComplete="username"
          // defaultValue={"www."}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...loginForm('password',
            {
              require: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 Characters'
              }
            }
          )}
          autoComplete="current-password"
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button
          size="large"
          disabled={isLoading}
        >
          {!isLoading ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
