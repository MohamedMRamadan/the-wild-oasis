import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styled } from "styled-components";

const PasswordIcon = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  font-size: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  right: 2%;

  &:focus {
    outline: none;
  }
`;
const StyledPassword = styled.div`
  position: relative;
  & Input {
    width: 100%;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return null;
    login(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
          setEmail("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
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
        <StyledPassword id="password">
          <Input
            type={!showPassword ? "password" : "text"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <PasswordIcon
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((val) => !val);
            }}
          >
            {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </PasswordIcon>
        </StyledPassword>
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
