import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  InfoOutlineIcon,
  // RepeatIcon,
  // SettingsIcon,
} from "@chakra-ui/icons";
import { ProfileCard } from "../shared/ui/profile-card";

interface HeaderProps {
  onUserReset: () => void;
}

export const Header = ({ onUserReset }: HeaderProps): JSX.Element => {
  const profileModalProps = useDisclosure();

  const menuOptions = [
    {
      children: "Profile",
      onClick: () => {
        profileModalProps.onOpen();
      },
      icon: <InfoOutlineIcon />,
      // command: "⌘N",
    },
    {
      children: "Reset user",
      onClick: onUserReset,
      icon: <ExternalLinkIcon />,
      // command: "⌘N",
      isDisabled: false,
    },
  ];

  return (
    <>
      <Flex p={2}>
        <Flex
          flex="1"
          gap="4"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="flex-end"
        >
          <Menu>
            <MenuButton aria-label="Options" children={<ProfileCard />} />
            <MenuList>
              {menuOptions.map((item) => (
                <MenuItem {...item} key={item.children} />
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};
