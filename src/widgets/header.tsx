import { Avatar, Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { User } from "../shared/models";

interface HeaderProps {
  user: User;
}

export const Header = ({ user }: HeaderProps): JSX.Element => {

  return (<>
    <Flex p={2}>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' justifyContent='flex-end'>
        <Avatar name={user.name} src={user.photoUrl} />

        <Box>
          <Heading size='sm'>{user.name}</Heading>
          <Box
            w={200}
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {user.bio}
          </Box>
        </Box>
      </Flex>
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
          <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />} command='⌘O'>
            Open File...
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  </>)
};
