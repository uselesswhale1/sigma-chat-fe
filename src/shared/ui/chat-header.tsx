import { Box, Flex, Avatar, Heading } from "@chakra-ui/react"
import { PALLETE } from "../constants/color-pallete"
import { Chat } from "../models"

interface ChatHeaderProps {
  chat: Chat
  typingMsg: string
}

export const ChatHeader = ({
  chat,
  typingMsg
}: ChatHeaderProps): JSX.Element => {

  return (
    <Box p={2} bg={PALLETE.bg} color={PALLETE.text} bottom={0} left={0} right={0} >

      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' >

        <Box>
          <Avatar name={chat.name} src={chat.photoUrl} />
        </Box>

        <Box>
          <Heading size='sm' textAlign='left'>{chat.name}</Heading>
          <Box
            w={200}
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {chat.creator.name}
          </Box>
          <Box
            w={200}
          >
            {typingMsg}
          </Box>
        </Box>

      </Flex>

    </Box>
  )
}