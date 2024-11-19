import { useRegister } from "../authentication/useRegister";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function RegisterForm() {
    const { register, isLoading, error } = useRegister();
    const { register: registerForm, formState, handleSubmit, reset } = useForm();
    const { errors } = formState;

    function onSubmit({ email, password }) {
        console.log({ email, password });


        if (!email || !password) return
        register({ email, password }, {
            onSettled: () => reset()
        });
    }

    if (error) return toast.error(error)

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type="regular">
            <FormRowVertical label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...registerForm('email',
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
                    defaultValue={"www."}
                    // onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    {...registerForm('password',
                        {
                            require: 'This field is required',
                            minLength: {
                                value: 8,
                                message: 'Password needs a minimum of 8 Characters'
                            }
                        }
                    )}
                    autoComplete="current-password"
                    defaultValue={""}
                    // onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label="Refferal Code">
                <Input
                    type="text"
                    id="Reffral"
                    // This makes this form better for password managers
                    autoComplete="username"
                    defaultValue={""}
                    // onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button
                    size="large"
                    disabled={isLoading}
                >
                    {!isLoading ? 'Register' : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default RegisterForm;
