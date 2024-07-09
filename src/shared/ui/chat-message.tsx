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
  const creationDate = new Date(message.createdAt)
    .toLocaleString()
    .split(", ")[1];

  const messageDirectionStyle = isOwnMessage ? "row-reverse" : "initial";
  const messageBgStyle = isOwnMessage ? PALLETE.a : PALLETE.b;

  return (
    <Flex
      flex="1"
      gap="4"
      flexWrap="wrap"
      alignItems="flex-start"
      m={2}
      flexDirection={messageDirectionStyle}
    >
      <Avatar name={message.creator.name} />

      <Box bg={messageBgStyle} p={2} borderRadius={10}>
        <Heading
          display="flex"
          flexDirection={messageDirectionStyle}
          size="sm"
          children={message.creator.name}
        />

        <Box w={360}>{message.content}</Box>

        <Heading
          as="h6"
          size="xs"
          display="flex"
          flexDirection="row-reverse"
          children={creationDate}
        />
      </Box>
    </Flex>
  );
};
