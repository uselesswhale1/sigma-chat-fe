import { Box, Button, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRef } from "react";
import { ChatMessageItem } from "../shared/ui/chat-message-item";
import { chatMock } from "../shared/mocks";


const ChatContainerInner = (): JSX.Element => {

  const messages = chatMock.map((msg) => (<ChatMessageItem data={msg} />))

  return (
    <Box display='flex' flexDirection='column' m={2}>{messages}</Box>
  )
}

export const ChatContainer = (): JSX.Element => {
  const inputRef = useRef('');

  const handleSend = (): void => {
    console.log(inputRef.current);

  }

  return (
    <VStack align='stretch'>
      <Box py={3} bg='green.500'>
        <Text>Header</Text>
      </Box>
      <Box bg='green.500' overflowY='scroll' h='500px'>
        <ChatContainerInner />
      </Box>
      <Box pb={2} flex='1'>
        <InputGroup>
          <Input placeholder='medium size' size='md' onChange={(e) => inputRef.current = e.target.value} />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleSend}>
              <ArrowForwardIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </VStack>
  )
}