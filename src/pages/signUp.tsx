import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Flex,
  Heading,
  VStack,
  StackDivider,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usersService } from "../api";
import { User } from "../shared/models";
import { useAtom } from "jotai";
import { userAtom, usersAtom } from "../shared/store";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [, setUser] = useAtom(userAtom);
  const [, setUsersAtom] = useAtom(usersAtom);

  const cancelRef = React.useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    usersService
      .getUsers()
      .then(setUsers)
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setUsersAtom(users);
  }, [users]);

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={true}
        onClose={() => {}}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              children="Sign up (select user)"
            />

            <AlertDialogBody>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                {users.map((user) => {
                  return (
                    <Button
                      key={user.id}
                      as={Flex}
                      onClick={() => {
                        setUser(user);
                        sessionStorage.setItem(
                          "user",
                          JSON.stringify({
                            id: user.id,
                            firstName: user.firstName,
                            chats: user.chats || [],
                          })
                        );
                        navigate("/");
                      }}
                    >
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                        p={2}
                      >
                        <Avatar
                          name={user.firstName}
                          src={user.photoUrl || ""}
                        />
                        <Box>
                          <Heading size="sm">{user.firstName}</Heading>
                          <Box
                            w={200}
                            whiteSpace="nowrap"
                            overflow="hidden"
                            unselectable="on"
                            textOverflow="ellipsis"
                          >
                            {user.bio}
                          </Box>
                        </Box>
                      </Flex>
                    </Button>
                  );
                })}
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" type="submit" ml={3} children="Next" />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
