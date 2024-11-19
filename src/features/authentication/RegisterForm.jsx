import { useState } from "react";
import { useRegister } from "../authentication/useRegister";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';

function RegisterForm() {
    const [email, setEmail] = useState("www.matinnn@gmail.com");
    const [password, setPassword] = useState("pass123123");
    const { register, isLoading } = useRegister();

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) return
        register({ email, password }, {
            onSettled: () => {
                setEmail("www.");
                setPassword("");
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit} type="regular">
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>
            <FormRowVertical label="Refferal Code">
                <Input
                    type="text"
                    id="Reffral"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={""}
                    onChange={(e) => setEmail(e.target.value)}
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
