import { Avatar, Box, Button, Flex, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { usersMock } from "../shared/mocks";
import { Chat } from "../shared/models";

interface MainProps {
  chat: Chat | null
  activeUserId: number
}
export const Main = ({ chat, activeUserId: id }: MainProps): JSX.Element => {

  const hasNoActiveChat = !chat?.id

  if (hasNoActiveChat) {

    return (<Box
      position='absolute'
      top='50%'
      left='55%'
    >
      <p>Select some chat.</p>
    </Box>)
  }


  return (
    <Box position='relative'>

      <Box h={600} overflowY='scroll'>
        {chat.messages.map((msg) => {
          const author = usersMock.find(({ id }) => id === msg.authorId)
          const isActiveUser = author?.id === id;

          return (
            <Flex>
              <Flex flex='1' gap='4' flexWrap='wrap' alignItems='flex-start' m={2} flexDirection={isActiveUser ? 'row-reverse' : 'initial'}>
                <Avatar name={author?.name} src={author?.photoUrl} />

                <Box bg='tomato' p={2} borderRadius={10} >
                  <Heading display='flex' flexDirection={isActiveUser ? 'row-reverse' : 'initial'} size='sm'>{author?.name}</Heading>
                  <Box
                    w={360}
                  >
                    {msg.content}
                  </Box>
                  <Heading as='h6' size='xs' display='flex' flexDirection='row-reverse' >
                    {msg.createdAt}
                  </Heading>
                </Box>
              </Flex>
            </Flex>
          )
        })}
      </Box>

      <Box p={2} bg='#F7ECA8' color='white' position='absolute' bottom={0} left={0} right={0}>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => { }}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  )
};
