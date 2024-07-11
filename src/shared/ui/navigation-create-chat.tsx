import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { CreateChatForm } from "../models";
import { CreateChatModal } from "../../widgets";
import { PALLETE } from "../constants";

interface NavigationCreateChatProps {
  onCreate: (v: CreateChatForm) => void;
}

export const NavigationCreateChat = ({
  onCreate,
}: NavigationCreateChatProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChatModalClose = (): void => {
    setIsOpen(false);
  };
  const handleChatModalOpen = (): void => {
    setIsOpen(true);
  };

  const handleChatCreate = (chat: CreateChatForm): void => {
    onCreate(chat);
    handleChatModalClose();
  };

  return (
    <>
      <Box
        data-testid="create-new-chat-test"
        border={"1px solid white"}
        cursor="pointer"
        onClick={handleChatModalOpen}
        my={"30%"}
        px="30%"
        py={5}
        borderRadius="10px"
      >
        <Heading size="xs" color={PALLETE.a} children="Create new chat" />
      </Box>

      {isOpen && (
        <CreateChatModal
          onCancel={handleChatModalClose}
          onCreate={handleChatCreate}
          open={isOpen}
        />
      )}
    </>
  );
};
