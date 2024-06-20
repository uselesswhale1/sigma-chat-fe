import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export const SignIn = () => {
  const { register, handleSubmit, trigger, formState, getFieldState } = useForm(
    {
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    }
  );

  const { errors, isValid, disabled } = formState;

  // useEffect(() => {
  //   if (formState.errors.firstName) {
  //     // do the your logic here
  //   }
  // }, [formState]); // ✅

  const cancelRef = React.useRef(null);

  const isLoading = false;

  const onSubmit = (data: any) => {
    console.log(data, errors);
  };

  console.log(formState);

  const commonInputProps = {
    onChange: () => {
      trigger();
    },
  };
  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={true}
        onClose={() => {}}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Sign in
              </AlertDialogHeader>

              <AlertDialogBody>
                <FormControl
                  isRequired
                  isInvalid={getFieldState("firstName").invalid}
                  isDisabled={disabled}
                >
                  <FormLabel>First name</FormLabel>
                  <Input
                    placeholder="John"
                    {...register("firstName")}
                    pattern="[\w']"
                    {...commonInputProps}
                  />
                  {errors.firstName && (
                    <FormErrorMessage>Invalid name value</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isDisabled={disabled}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Doe"
                    {...register("lastName")}
                    {...commonInputProps}
                  />
                  {errors.lastName && (
                    <FormErrorMessage>Invalid name value</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isDisabled={disabled}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="john.doe@gmail.com"
                    {...register("email")}
                    required={true}
                    type="email"
                    pattern="[\w-\.]+@[\w-\.]+\.[a-z]{2,4}$"
                    {...commonInputProps}
                  />
                  {errors.email && (
                    <FormErrorMessage>Email is required</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isDisabled={disabled}>
                  <FormLabel>Phone</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>+234</InputLeftAddon>
                    <Input
                      type="tel"
                      placeholder="phone number"
                      {...register("phone")}
                      {...commonInputProps}
                    />
                  </InputGroup>
                </FormControl>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  colorScheme="red"
                  type="submit"
                  ml={3}
                  isDisabled={!isValid}
                  isLoading={isLoading}
                >
                  Next
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
