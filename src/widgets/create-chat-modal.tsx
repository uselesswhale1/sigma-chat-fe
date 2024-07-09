import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { CreateChatForm, User } from "../shared/models";
import { userAtom } from "../shared/store";
import { usersService } from "../api";
import { Dialog } from "../shared/ui/dialog";

interface CreateChatModalProps {
  open: boolean;
  onCreate: (chat: CreateChatForm) => void;
  onCancel: () => void;
}

export const CreateChatModal = ({
  onCreate,
  onCancel,
  open,
}: CreateChatModalProps) => {
  const [activeUser] = useAtom(userAtom);

  const [users, setUsers] = useState<User[]>([]);
  const [invited, setInvited] = useState<string[]>([]);

  useEffect(() => {
    usersService.getUsers().then(setUsers).catch(console.error);
  }, []); // eslnt-disable-line react-hooks/exhaustive-deps

  const {
    register,
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

  const formBody = (
    <>
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
        {errors.name && <FormErrorMessage>Invalid name value</FormErrorMessage>}
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
    </>
  );

  const footerActions = (
    <>
      <Button type="submit" ml={3} isDisabled={!isValid} children="Create" />
    </>
  );

  return (
    <Dialog
      header="New Chat"
      footerActions={footerActions}
      formBody={formBody}
      onClose={onCancel}
      onSubmit={onSubmit}
      open={open}
    />
  );
};
