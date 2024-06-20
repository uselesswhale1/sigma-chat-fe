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
import { userAtom } from "../shared/store";
import { useNavigate } from "react-router-dom";

// interface SignUpProps { }

export const SignUp = () => {
  // export const SignUp = ({ }: SignUpProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [, setUser] = useAtom(userAtom);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    usersService.getUsers().then(setUsers);

    // toast.promise<User[]>(usersService.getUsers(), {
    //   success: (data) => {
    //     setUsers(data);
    //     return {
    //       title: "Promise resolved",
    //       description: "Looks great",
    //     };
    //   },
    //   error: (error) => ({
    //     title: error.message,
    //     description: "Something wrong",
    //   }),
    //   loading: { title: "Promise pending", description: "Please wait" },
    // });
  }, []);

  const cancelRef = React.useRef(null);

  // const login = (e: React.FormEvent<HTMLFormElement>) => {
  //   const formValue = e.target[0].value;
  //   const newUser = {
  //     userId: Date.now().toLocaleString().concat(formValue),
  //     userName: formValue,
  //   };
  //   sessionStorage.setItem('user', JSON.stringify(newUser));
  //   setUser(newUser);
  // };

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
