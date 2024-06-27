import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { authService } from "../api/auth.service";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../shared";
import { useNotifications } from "../shared/hooks";

export const SignIn = (): JSX.Element => {
  const [, setUser] = useAtom(userAtom);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      pass: "",
    },
  });

  const { errors, isValid, disabled } = formState;

  const cancelRef = useRef(null);
  const navigate = useNavigate();
  const notify = useNotifications();

  const isLoading = false;

  const onSubmit = async (data: any) => {
    try {
      const res: any = await authService.login({
        email: data.email,
        password: data.pass,
      });

      const { access_token, ...rest } = res.data;

      if (access_token) {
        sessionStorage.setItem("token", access_token);

        setUser(rest);

        navigate("/");
        return;
      }
    } catch (error: any) {
      notify.error("Failed to find user");
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
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Sign in
              </AlertDialogHeader>

              <AlertDialogBody>
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
                  onClick={() => {
                    navigate("/signup");
                  }}
                  ml={3}
                  isDisabled={!isValid}
                  isLoading={isLoading}
                >
                  No account? Create one
                </Button>
                <Button
                  type="submit"
                  ml={3}
                  isDisabled={!isValid}
                  isLoading={isLoading}
                >
                  Log in
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
