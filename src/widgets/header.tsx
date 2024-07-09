import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Card } from "../shared/ui";
import { userAtom } from "../shared/store";
import { PALLETE } from "../shared/constants";

interface HeaderProps {
  onUserReset: () => void;
}

export const Header = ({ onUserReset }: HeaderProps): JSX.Element => {
  const [user] = useAtom(userAtom);

  const profileModalProps = useDisclosure();

  const menuOptions = [
    {
      children: "Profile",
      onClick: () => {
        profileModalProps.onOpen();
      },
      icon: <InfoOutlineIcon />,
      isDisabled: true,
    },
    {
      children: "Log out",
      onClick: onUserReset,
      icon: <ExternalLinkIcon />,
      isDisabled: false,
    },
  ];

  if (!(user && user.id)) {
    return <></>;
  }

  return (
    <Flex
      flex="1"
      alignItems="center"
      flexWrap="wrap"
      justifyContent="flex-end"
    >
      <Menu>
        <MenuButton
          aria-label="Options"
          children={
            <Card
              bg={PALLETE.a}
              name={user.name}
              photoUrl={user.photoUrl || ""}
              text={user.bio || ""}
              header={user.name}
              isReversed
            />
          }
        />
        <MenuList>
          {menuOptions.map((item) => (
            <MenuItem {...item} key={item.children} />
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};
