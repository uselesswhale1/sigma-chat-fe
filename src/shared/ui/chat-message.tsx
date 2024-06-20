import { Flex, Avatar, Heading, Box } from "@chakra-ui/react";
import { Message } from "../../shared/models";
import { PALLETE } from "../constants/color-pallete";

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export const ChatMessage = ({
  message,
  isOwnMessage,
}: ChatMessageProps): JSX.Element => {
  // TODO fix date transformation
  const msgCreated = new Date(message.createdAt)
    .toLocaleString()
    .split(", ")[1];

  return (
    <Flex>
      <Flex
        flex="1"
        gap="4"
        flexWrap="wrap"
        alignItems="flex-start"
        m={2}
        flexDirection={isOwnMessage ? "row-reverse" : "initial"}
      >
        <Avatar name={message.creator.name} />

        <Box bg={isOwnMessage ? PALLETE.a : PALLETE.b} p={2} borderRadius={10}>
          <Heading
            display="flex"
            flexDirection={isOwnMessage ? "row-reverse" : "initial"}
            size="sm"
          >
            {message.creator.name}
          </Heading>
          <Box w={360}>{message.content}</Box>
          <Heading
            as="h6"
            size="xs"
            display="flex"
            flexDirection="row-reverse"
            children={msgCreated}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
