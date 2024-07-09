import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Dialog } from "../shared/ui";
import { SignInValues } from "../shared/models";

export const SignInDialog = ({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (v: SignInValues) => void;
}): JSX.Element => {
  const { register, handleSubmit, formState } = useForm<SignInValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { errors, isValid, disabled } = formState;

  const formBody = (
    <>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="john.doe@gmail.com"
          {...register("email")}
          required={true}
          type="email"
          pattern="[\w-\.]+@[\w-\.]+\.[a-z]{2,4}$"
        />
        {errors.email && <FormErrorMessage>Email is required</FormErrorMessage>}
      </FormControl>
      <FormControl isDisabled={disabled}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            placeholder="passw"
            {...register("password")}
          />
        </InputGroup>
      </FormControl>
    </>
  );

  const footerActions = (
    <>
      <Button
        onClick={() => {
          navigate("/signup");
        }}
        ml={3}
        isDisabled={!isValid}
        isLoading={loading}
        children="No account? Create one"
      />
      <Button
        type="submit"
        ml={3}
        isDisabled={!isValid}
        isLoading={loading}
        children="Log in"
      />
    </>
  );

  return (
    <Dialog
      onClose={() => {}}
      onSubmit={handleSubmit(onSubmit)}
      open={true}
      header="Sign in"
      formBody={formBody}
      footerActions={footerActions}
    />
  );
};
