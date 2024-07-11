import { useState } from "react";
import { useAtom } from "jotai";
import { Box, Heading } from "@chakra-ui/react";
import { chatAtom, userAtom } from "../shared/store";
import { PALLETE } from "../shared/constants";
import { NavigationCreateChat } from "../shared/ui";
import { Chat, ChatInvite, CreateChatForm } from "../shared/models";
import { NavigationChat, NavigationInvite } from ".";
import { chatService } from "../api";

interface NavigationProps {
  chats: Chat[];
  invites: ChatInvite[];
  onChatChange: (chatId: string) => void;
}

export const Navigation = ({
  chats,
  invites,
  onChatChange,
}: NavigationProps): JSX.Element => {
  const [user] = useAtom(userAtom);
  const [active, setActive] = useAtom(chatAtom);

  const [selected, setSelected] = useState<string>();

  const isUserExists = !!(user && user.id);

  const handleCardSelect = (newId: string): void => {
    if (selected === newId) return;

    setSelected(newId);
    onChatChange(newId);
  };

  const handleChatDelete = (chatId: Chat["id"]): void => {
    if (chatId === active?.id) {
      setActive(null);
    }

    if (isUserExists) {
      chatService.deleteChat({
        id: chatId,
        userId: user?.id,
      });
    }
  };

  const handleChatCreate = (values: CreateChatForm): void => {
    if (isUserExists) {
      chatService.createChat({
        ...values,
        creator: user.id,
        lastMessage: "",
      });
    }
  };

  const handleInviteDecline = (id: Chat["id"]): void => {
    if (isUserExists) {
      console.log("todo delete invitation", id);
    }
  };

  return (
    <Box h={620} w={370} overflowY="scroll">
      {chats.map((chat) => (
        <NavigationChat
          key={chat.id}
          {...chat}
          isSelected={selected === chat.id}
          onSelect={(newId) => {
            handleCardSelect(newId);
            setActive(chat);
          }}
          onDelete={handleChatDelete}
        />
      ))}

      <Box bgColor={PALLETE.h} pb={1} hidden={!invites.length}>
        <Heading size="sm" px={2} children="Invites:" />

        {invites.map(({ id, name }) => (
          <NavigationInvite
            key={id}
            name={name}
            onConfirm={(): void => chatService.join(id)}
            onDelete={(): void => handleInviteDecline(id)}
          />
        ))}
      </Box>

      <NavigationCreateChat onCreate={handleChatCreate} />
    </Box>
  );
};
