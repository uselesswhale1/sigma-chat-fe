import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Chat, ChatInvite, CreateChatForm } from "../shared/models";
import { NavigationCard } from "../shared/ui";
import { CreateChatModal } from "../shared/ui/create-chat-modal";
import { useAtom } from "jotai";
import { chatAtom } from "../shared/store";
import { NavigationInvite } from "../shared/ui/navigation-invite";

interface NavigationProps {
  chats: Chat[];
  // typingMsg: string;
  invites: ChatInvite[];
  onChatChange: (chatId: string) => void;
  onChatCreate: (newChat: CreateChatForm) => void;
  onChatDelete: (id: Chat["id"]) => void;
  onInviteConfirm: (id: Chat["id"]) => void;
  onInviteDecline: (id: Chat["id"]) => void;
}

export const Navigation = ({
  chats,
  // typingMsg,
  invites,
  onChatChange,
  onChatCreate,
  onChatDelete,
  onInviteConfirm,
  onInviteDecline,
}: NavigationProps): JSX.Element => {
  const [activeChat, setChat] = useAtom(chatAtom);

  const [selected, setSelected] = useState<string>();

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const handleChatModalClose = (): void => {
    setIsCreateOpen(false);
  };
  const handleChatModalOpen = (): void => {
    setIsCreateOpen(true);
  };

  const handleChatCreate = (chat: CreateChatForm): void => {
    onChatCreate(chat);
    handleChatModalClose();
  };

  const handleChatDelete = (chatId: Chat["id"]): void => {
    if (chatId === activeChat?.id) {
      setChat(null);
    }
    onChatDelete(chatId);
  };

  const handleCardSelect = (newId: string): void => {
    if (selected === newId) return;

    setSelected(newId);
    onChatChange(newId);
  };

  const createChatMessage = (
    <Heading size="xs" m="30%" color="teal.500" onClick={handleChatModalOpen}>
      Create new chat
    </Heading>
  );

  return (
    <Box h={620} w={370} overflowY="scroll">
      {chats.map((chat) => {
        return (
          <NavigationCard
            key={chat.id}
            {...chat}
            // typingMsg={typingMsg} // TODO handle isTyping
            isSelected={selected === chat.id}
            onSelect={(newId) => {
              handleCardSelect(newId);
              setChat(chat);
            }}
            onDelete={handleChatDelete}
          />
        );
      })}

      {invites.map((invite) => (
        <NavigationInvite
          key={invite.id}
          name={invite.name}
          onConfirm={(): void => onInviteConfirm(invite.id)}
          onDelete={(): void => onInviteDecline(invite.id)}
        />
      ))}
      {createChatMessage}

      {isCreateOpen && (
        <CreateChatModal
          onCancel={handleChatModalClose}
          onCreate={handleChatCreate}
          open={isCreateOpen}
        />
      )}
    </Box>
  );
};
