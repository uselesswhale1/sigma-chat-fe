import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../shared/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../api/auth.service";
import { useNotifications } from "../shared/hooks";

export const SignUp = () => {
  const [, setUser] = useAtom(userAtom);
  const { register, handleSubmit, trigger, formState, getFieldState } = useForm(
    {
      defaultValues: {
        email: "",
        pass: "",
        firstName: "",
        lastName: "",
      },
    }
  );

  const { errors, isValid, disabled } = formState;

  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const notify = useNotifications();

  const onSubmit = async (data: any) => {
    try {
      const res: any = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.pass,
      });

      console.log(res);

      const { access_token, user } = res.data;

      if (access_token) {
        sessionStorage.setItem("token", access_token);

        setUser(user);

        navigate("/");
        return;
      }
    } catch (error: any) {
      console.log(error);

      notify.error(error.response.data.message || "Failed to create user");
    }
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
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                children="Sign up (select user)"
              />
              <AlertDialogBody>
                <FormControl isDisabled={disabled}>
                  <FormLabel>First name</FormLabel>
                  <Input
                    placeholder="John"
                    {...register("firstName")}
                    required={true}
                  />
                  {errors.firstName && (
                    <FormErrorMessage>First name is required</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isDisabled={disabled}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Doe"
                    {...register("lastName")}
                    required={false}
                  />
                  {errors.lastName && (
                    <FormErrorMessage>Invalid value</FormErrorMessage>
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
                  />
                  {errors.email && (
                    <FormErrorMessage>Email is required</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isDisabled={disabled}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type="password"
                      placeholder="passw"
                      {...register("pass")}
                    />
                  </InputGroup>
                </FormControl>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  // colorScheme="red"
                  onClick={() => {
                    navigate("/signin");
                  }}
                  ml={3}
                  // isDisabled={!isValid}
                  // isLoading={isLoading}
                >
                  Have account? Log in
                </Button>
                <Button
                  // colorScheme="red"
                  type="submit"
                  ml={3}
                  // isDisabled={!isValid}
                  // isLoading={isLoading}
                >
                  Create
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
