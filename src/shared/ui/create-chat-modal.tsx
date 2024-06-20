import {
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { CreateChatForm } from "../models";

interface CreateChatModalProps {
  open: boolean;
  onCreate: (chat: CreateChatForm) => void;
  onCancel: () => void;
}

// TODO provide invited and photoUrl
export const CreateChatModal = ({
  onCreate,
  onCancel,
  open,
}: CreateChatModalProps) => {
  const cancelRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, disabled },
    getFieldState,
    getValues,
  } = useForm<CreateChatForm>({
    defaultValues: {
      name: "My-chat",
      // photoUrl: '',
      invited: [],
    },
  });

  const onSubmit = (): void => {
    const { name, photoUrl, invited } = getValues();

    const newChat: CreateChatForm = {
      name,
      photoUrl,
      invited,
    };

    onCreate(newChat);
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={open}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              New Chat
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl
                isRequired
                isInvalid={getFieldState("name").invalid}
                isDisabled={disabled}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="My chat"
                  {...register("name")}
                  // pattern="[\w']"
                  autoFocus
                />
                {errors.name && (
                  <FormErrorMessage>Invalid name value</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isDisabled={disabled}>
                <FormLabel>Photo</FormLabel>
                add photo here
              </FormControl>

              <FormControl isDisabled={disabled}>
                <FormLabel>Participants</FormLabel>
                add participants here via dropdown list
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                // colorScheme='red'
                type="submit"
                ml={3}
                isDisabled={!isValid}
              >
                Create
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
