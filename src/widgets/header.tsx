import { Avatar, AvatarBadge, Box, Flex, Heading, IconButton, useDisclosure } from "@chakra-ui/react"
import { usersMock } from "../shared/mocks"
import { ProfileModal } from "./profile-modal";
import { SettingsIcon } from "@chakra-ui/icons";

export const Header = (): JSX.Element => {
  const user = usersMock[2];

  const dialogModalProps = useDisclosure({}); //defaultIsOpen: true

  return (
    <>
      <Box display='flex' justifyContent='flex-end'>
        <Flex>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar size='sm' name={user.name} src={user.photoUrl} onClick={dialogModalProps.onOpen}>
              <AvatarBadge
                boxSize='0.9em'
                border='1px solid white'
                bg={user.online ? 'green.400' : 'gray.400'}
              />
            </Avatar>
            <Box>
              <Heading size='sm'>{user.name}</Heading>
              {/* Creator, Chakra UI */}
            </Box>
          </Flex>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            onClick={dialogModalProps.onOpen}
            icon={<SettingsIcon />}
          // icon={<BsThreeDotsVertical />}
          />
        </Flex>

      </Box>
      <ProfileModal {...dialogModalProps} />
    </>
  )
}