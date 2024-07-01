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
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { CreateChatForm } from "../models";
import { userAtom, usersAtom } from "../store";
import { useAtom } from "jotai";
import { usersService } from "../../api";

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
  const [users, setUsers] = useAtom(usersAtom);
  const [activeUser] = useAtom(userAtom);

  const [invited, setInvited] = useState<string[]>([]);

  const cancelRef = useRef(null);

  useEffect(() => {
    if (!users.length) {
      usersService.getUsers().then(setUsers).catch();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    const { name, photoUrl } = getValues();

    const newChat: CreateChatForm = {
      name,
      photoUrl,
      invited,
      creator: "",
    };

    onCreate(newChat);
  };

  // TODO check, works poorly
  const toggleInvited = (userId: string) => {
    setInvited((prev) => {
      if (prev.includes(userId)) {
        return [...prev.filter((id) => id === userId)];
      }
      return [...prev, userId];
    });
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
                <FormLabel>Participants</FormLabel>

                <Stack pl={6} mt={1} spacing={1}>
                  {users.map((user, i) => {
                    if (user.id === activeUser?.id) {
                      return <></>;
                    }
                    return (
                      <Checkbox
                        key={user.id}
                        isChecked={invited.includes(user.id)}
                        onChange={(e) => {
                          toggleInvited(user.id);
                        }}
                      >
                        {user.name}
                      </Checkbox>
                    );
                  })}
                </Stack>
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
