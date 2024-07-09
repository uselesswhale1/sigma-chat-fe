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
import { SignUpValues } from "../shared/models";

export const SignUpDialog = ({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (v: SignUpValues) => void;
}): JSX.Element => {
  const { register, handleSubmit, formState } = useForm<SignUpValues>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const navigate = useNavigate();

  const { errors, isValid, disabled } = formState;

  const formBody = (
    <>
      <FormControl isDisabled={disabled}>
        <FormLabel>First name</FormLabel>
        <Input placeholder="John" {...register("firstName")} required={true} />
        {errors.firstName && (
          <FormErrorMessage>First name is required</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isDisabled={disabled}>
        <FormLabel>Last name</FormLabel>
        <Input placeholder="Doe" {...register("lastName")} required={false} />
        {errors.lastName && <FormErrorMessage>Invalid value</FormErrorMessage>}
      </FormControl>
      <FormControl isDisabled={disabled}>
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
          navigate("/signin");
        }}
        ml={3}
        isDisabled={!isValid}
        isLoading={loading}
        children="Have account? Log in"
      />
      <Button
        type="submit"
        ml={3}
        isDisabled={!isValid}
        isLoading={loading}
        children="Create"
      />
    </>
  );

  return (
    <Dialog
      onClose={() => {}}
      onSubmit={handleSubmit(onSubmit)}
      open={true}
      header="Sign up"
      formBody={formBody}
      footerActions={footerActions}
    />
  );
};
