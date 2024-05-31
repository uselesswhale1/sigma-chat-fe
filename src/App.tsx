import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UseDisclosureProps, useDisclosure } from "@chakra-ui/react";
import { Navigation } from "./widgets/navigation";
import { Header } from "./widgets/header";
import { useAtom } from "jotai";
import { userAtom } from "./shared/store";
import { useEffect, useState } from "react";
import { chatsMock, usersMock } from "./shared/mocks";
import React from "react";
import { Main } from "./widgets/main";

interface UserForm {
  name: string,
  lastname: string | null,
  email: string,
  phone: string
}

const App = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [overlay, setOverlay] = React.useState(<OverlayOne />)
  const [form, setForm] = useState<UserForm>({
    name: '',
    lastname: null,
    email: '',
    phone: ''
  })

  useEffect(() => {
    setUser(usersMock[2]);
    // if (user.id === 999) {
    //   onOpen()
    // }
  }, []);

  // const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
  //   console.log(event);

  //   setForm((prev) => ({ ...prev, name: event.target.value }))
  // }

  return (
    <div className="App">
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* isInvalid={isNameInvalid} */}
            <FormControl isRequired >
              <FormLabel>First name</FormLabel>
              <Input placeholder='John' />
              {/* {isNameInvalid && (
                <FormHelperText>
                  Invalid input value
                </FormHelperText>
              )} */}
            </FormControl>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Doe' />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder='john.doe@gmail.com' />
              {/* {!isEmailInvalid ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )} */}
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <InputGroup>
                <InputLeftAddon>+234</InputLeftAddon>
                <Input type='tel' placeholder='phone number' />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid
        templateAreas={`
          "header header"
          "nav main"
        
          `}
        gridTemplateRows={'60px 1fr '}
        gridTemplateColumns={'360px 1fr'}
        // h='200px'
        // gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='orange.300' area={'header'}>
          <Header user={user} />
        </GridItem>
        <GridItem bg='#14452F' area={'nav'}>
          <Navigation chats={user.chats || []} />
        </GridItem>
        <GridItem pl='2' bg='#0A5C36' area={'main'}>
          {/* chat={user.chats[0]} */}
          <Main chat={chatsMock[0]} activeUserId={user.id} />
        </GridItem>
        {/* <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem> */}
      </Grid>
    </div>
  );
};

export default App;
