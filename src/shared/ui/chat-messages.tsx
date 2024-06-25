import { useRef, useEffect } from "react";
import { Message } from "../models";
import { ChatMessage } from "./chat-message";
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { userAtom } from "../store";

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps): JSX.Element => {
  const [user] = useAtom(userAtom);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <Box overflowY="scroll" h={510} maxH={510} scrollMarginTop="e9e">
      {messages.map((msg) => {
        const isActiveUser = user?.id === msg.creator.id;

        return (
          <ChatMessage
            isOwnMessage={isActiveUser}
            message={msg}
            key={msg.createdAt}
          />
        );
      })}

      <div ref={messageEndRef} />
    </Box>
  );
};
