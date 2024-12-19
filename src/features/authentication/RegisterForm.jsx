import { useRegister } from "../authentication/useRegister";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';


function RegisterForm() {
    const { t } = useTranslation();
    const { referralCode } = useParams();
    const { register, isLoading } = useRegister();
    const { register: registerForm, formState: { errors }, handleSubmit, reset } = useForm();

    function onSubmit({ email, password, referral }) {
        if (!email || !password) return;
        register({ email, password, referral }, {
            onSettled: () => reset()
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type="regular">
            <FormRowVertical label={t('login.email', 'Email Address')} error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...registerForm('email', {
                        require: t('errors.require', 'This field is required'),
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: t('errors.email', 'Please provide a valid email address')
                        }
                    })}
                    autoComplete="username"
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label={t('signup.password', "Password (min 8 characters)")} error={errors?.password?.message}>
                <Input
                    type="password"
                    id="password"
                    {...registerForm('password', {
                        require: t('errors.require', 'This field is required'),
                        minLength: {
                            value: 8,
                            message: t('errors.password', 'Password needs a minimum of 8 Characters')
                        }
                    })}
                    autoComplete="current-password"
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label={t('signup.referral', 'Referral Code')}>
                <Input
                    type="text"
                    id="referral"
                    {...registerForm('referral')}
                    defaultValue={referralCode || ""}  // استفاده از defaultValue برای قرار دادن مقدار پارامتر URL
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isLoading}>
                    {!isLoading ? t('signup.signup', 'Create Account') : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default RegisterForm;
