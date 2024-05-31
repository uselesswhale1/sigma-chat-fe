import { Avatar, Box, Flex, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { chatsMock } from "../shared/mocks";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";

interface NavigationProps {
  chats: number[]
}
export const Navigation = ({ chats: chatIds }: NavigationProps): JSX.Element => {

  const chats = chatsMock.filter(({ id }) => chatIds.includes(id))

  const onCreateChat = (): void => {
    //TODO handle chat creation
    console.log('TODO handle chat creation');
  };

  const handleMenuClick = (): void => {
    //TODO handle chat creation
    console.log('TODO handle chat creation');

  };

  return (<>
    {!chats.length &&
      <p>Chats will appear here,&nbsp;
        <Link color='teal.500' href='#' onClick={onCreateChat}>
          write somebody
        </Link>
      </p>
    }
    {chats.map((chat) => {

      return (

        <Flex bg='#91Ba8D' p={4} m={1}>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={chat.name} src={chat.photoUrl} />

            <Box>
              <Heading size='sm'>{chat.name}</Heading>
              <Box
                w={200}
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {chat.messages[chat.messages.length - 1].content}
              </Box>
            </Box>
          </Flex>
          {/* <IconButton
                      variant='ghost'
                      colorScheme='gray'
                      aria-label='See menu'
                      icon={<DragHandleIcon />}
                      onClick={() => handleMenuClick()}
                    /> */}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='ghost'
            />
            <MenuList>
              <MenuItem icon={<AddIcon />} command='⌘T'>
                New Tab
              </MenuItem>
              {/* <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                          New Window
                        </MenuItem>
                        <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                          Open Closed Tab
                        </MenuItem>
                        <MenuItem icon={<EditIcon />} command='⌘O'>
                          Open File...
                        </MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      )
    })}
  </>
  )
};
